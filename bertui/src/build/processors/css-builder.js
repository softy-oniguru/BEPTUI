// bertui/src/build/processors/css-builder.js - SAFE VERSION
import { join } from 'path';
import { existsSync, readdirSync, mkdirSync } from 'fs';
import logger from '../../logger/logger.js';

export async function buildAllCSS(root, outDir) {
  const srcStylesDir = join(root, 'src', 'styles');
  const stylesOutDir = join(outDir, 'styles');
  
  mkdirSync(stylesOutDir, { recursive: true });
  
  if (existsSync(srcStylesDir)) {
    const cssFiles = readdirSync(srcStylesDir).filter(f => f.endsWith('.css'));
    
    if (cssFiles.length === 0) {
      await Bun.write(join(stylesOutDir, 'bertui.min.css'), '/* No CSS */');
      return;
    }
    
    logger.info(`Processing ${cssFiles.length} CSS file(s)...`);
    
    let combinedCSS = '';
    for (const cssFile of cssFiles) {
      const srcPath = join(srcStylesDir, cssFile);
      const file = Bun.file(srcPath);
      const cssContent = await file.text();
      combinedCSS += `/* ${cssFile} */\n${cssContent}\n\n`;
    }
    
    const combinedPath = join(stylesOutDir, 'bertui.min.css');
    
    // ✅ SAFE: Try Lightning CSS, fallback to simple minification
    try {
      const minified = await minifyCSSSafe(combinedCSS);
      await Bun.write(combinedPath, minified);
      
      const originalSize = Buffer.byteLength(combinedCSS);
      const minifiedSize = Buffer.byteLength(minified);
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      
      logger.success(`CSS minified: ${(originalSize/1024).toFixed(2)}KB → ${(minifiedSize/1024).toFixed(2)}KB (-${reduction}%)`);
    } catch (error) {
      logger.warn(`CSS minification failed: ${error.message}`);
      logger.info('Falling back to unminified CSS...');
      await Bun.write(combinedPath, combinedCSS);
    }
    
    logger.success(`✅ Combined ${cssFiles.length} CSS files`);
  } else {
    // No styles directory, create empty CSS
    await Bun.write(join(stylesOutDir, 'bertui.min.css'), '/* No custom styles */');
    logger.info('No styles directory found, created empty CSS');
  }
}

/**
 * Safe CSS minification with fallback
 */
async function minifyCSSSafe(css) {
  // Try Lightning CSS first
  try {
    const { transform } = await import('lightningcss');
    
    const { code } = transform({
      filename: 'styles.css',
      code: Buffer.from(css),
      minify: true,
      sourceMap: false,
      targets: {
        chrome: 90 << 16,
        firefox: 88 << 16,
        safari: 14 << 16,
        edge: 90 << 16
      }
    });
    
    return code.toString();
    
  } catch (lightningError) {
    logger.warn('Lightning CSS failed, using simple minification');
    
    // Fallback: Simple manual minification
    return simpleMinifyCSS(css);
  }
}

/**
 * Simple CSS minification without dependencies
 */
function simpleMinifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove space around { } : ; ,
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons before }
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}