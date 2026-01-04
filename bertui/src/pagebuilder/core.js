// bertui/src/pagebuilder/core.js
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * BertUI Page Builder - Core Engine
 * Generates .jsx files from data sources
 */
export class PageBuilder {
  constructor(config, root) {
    this.config = config;
    this.root = root;
    this.generatedFiles = [];
  }

  /**
   * Main build process
   */
  async build() {
    if (!this.config.pageBuilder) {
      logger.debug('No Page Builder configured');
      return [];
    }

    logger.bigLog('PAGE BUILDER 📄', { color: 'cyan' });
    
    const configs = Array.isArray(this.config.pageBuilder) 
      ? this.config.pageBuilder 
      : [this.config.pageBuilder];

    for (const builderConfig of configs) {
      await this.buildPages(builderConfig);
    }

    return this.generatedFiles;
  }

  /**
   * Build pages from a single page builder config
   */
  async buildPages(builderConfig) {
    const name = builderConfig.name || 'default';
    logger.info(`📦 Running Page Builder: ${name}`);

    try {
      // Step 1: Fetch data
      logger.info('Step 1: Fetching data...');
      const startFetch = Date.now();
      const data = await builderConfig.dataSource();
      const fetchTime = Date.now() - startFetch;
      
      if (!Array.isArray(data) || data.length === 0) {
        logger.warn('No data returned from dataSource');
        return;
      }

      logger.success(`✅ Fetched ${data.length} items in ${fetchTime}ms`);

      // Step 2: Load template
      logger.info('Step 2: Loading template...');
      const templatePath = join(this.root, builderConfig.template);
      
      if (!existsSync(templatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
      }

      const templateContent = await Bun.file(templatePath).text();
      logger.success(`✅ Template loaded: ${builderConfig.template}`);

      // Step 3: Generate pages
      logger.info('Step 3: Generating pages...');
      await this.generatePages(data, builderConfig, templateContent);

    } catch (error) {
      logger.error(`Page Builder failed: ${error.message}`);
      if (error.stack) logger.error(error.stack);
      throw error;
    }
  }

  /**
   * Generate individual pages from data
   */
  async generatePages(data, config, templateContent) {
    const batchSize = config.batchSize || 20;
    const outputPattern = config.outputPattern || '/generated/[slug]';
    
    logger.info(`📝 Generating ${data.length} pages (batch size: ${batchSize})...`);

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      // Process batch sequentially
      for (const item of batch) {
        try {
          await this.generateSinglePage(item, config, templateContent, outputPattern);
        } catch (error) {
          logger.error(`Failed to generate page for: ${item.slug || 'unknown'}`);
          logger.error(error.message);
          
          if (config.hooks?.onError) {
            await config.hooks.onError(error, item);
          }
        }
      }

      const processed = Math.min(i + batchSize, data.length);
      const percent = ((processed / data.length) * 100).toFixed(1);
      logger.info(`   Progress: ${processed}/${data.length} (${percent}%)`);

      // Small delay between batches
      if (i + batchSize < data.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    logger.success(`✅ Generated ${data.length} pages`);
  }

  /**
   * Generate a single page file
   */
  async generateSinglePage(item, config, templateContent, outputPattern) {
    // Map data if mapper provided
    const mappedData = config.mapData ? config.mapData(item) : item;

    // Generate meta tags
    const meta = config.generateMeta ? config.generateMeta(mappedData) : {};

    // Determine output path
    const outputPath = this.resolveOutputPath(outputPattern, mappedData);
    const fullPath = join(this.root, 'src', 'pages', outputPath);

    // Ensure directory exists
    const dir = join(fullPath, '..');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Generate file content
    const fileContent = this.generateFileContent(
      mappedData,
      meta,
      templateContent,
      config
    );

    // Write file
    await Bun.write(fullPath, fileContent);
    this.generatedFiles.push(fullPath);
  }

  /**
   * Resolve output path from pattern
   */
  resolveOutputPath(pattern, data) {
    let path = pattern;
    
    // Replace [slug] with actual slug
    path = path.replace(/\[slug\]/g, data.slug || 'unnamed');
    
    // Replace [category] with actual category
    if (data.category) {
      path = path.replace(/\[category\]/g, data.category);
    }
    
    // Replace [id] with actual id
    if (data.id) {
      path = path.replace(/\[id\]/g, data.id);
    }

    // Ensure .jsx extension
    if (!path.endsWith('.jsx')) {
      path += '.jsx';
    }

    return path;
  }

  /**
   * Generate complete file content
   */
  generateFileContent(data, meta, templateContent, config) {
    const serverIslands = config.serverIslands !== false; // Default true

    // Build file header
    let content = '// 🤖 Auto-generated by BertUI Page Builder\n';
    content += `// Generated at: ${new Date().toISOString()}\n\n`;

    // Add Server Islands marker
    if (serverIslands) {
      content += 'export const render = "server";\n\n';
    }

    // Add meta export
    if (Object.keys(meta).length > 0) {
      content += 'export const meta = ';
      content += JSON.stringify(meta, null, 2);
      content += ';\n\n';
    }

    // Extract template component
    const componentMatch = templateContent.match(
      /export\s+default\s+function\s+(\w+)\s*\(\s*\{?\s*data\s*\}?\s*\)/
    );

    if (!componentMatch) {
      throw new Error('Template must export a default function with data prop');
    }

    const componentName = componentMatch[1];

    // Build component with injected data
    content += `export default function ${componentName}() {\n`;
    content += `  const data = ${JSON.stringify(data, null, 4)};\n\n`;
    
    // Extract JSX from template
    const jsxMatch = templateContent.match(/return\s*\(([\s\S]*?)\);?\s*\}/);
    
    if (jsxMatch) {
      content += `  return (${jsxMatch[1]});\n`;
    } else {
      throw new Error('Template must have a return statement with JSX');
    }

    content += '}\n';

    return content;
  }
}

/**
 * Run Page Builder before build
 */
export async function runPageBuilder(root, config) {
  const builder = new PageBuilder(config, root);
  const generated = await builder.build();
  
  if (generated.length > 0) {
    logger.success(`📄 Page Builder generated ${generated.length} pages`);
  }
  
  return generated;
}