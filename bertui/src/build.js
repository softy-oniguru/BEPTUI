// bertui/src/build.js - UPDATED WITH PAGE BUILDER
import { join } from 'path';
import { existsSync, mkdirSync, rmSync } from 'fs';
import logger from './logger/logger.js';
import { loadEnvVariables } from './utils/env.js';
import { runPageBuilder } from './pagebuilder/core.js';

// Import modular components
import { compileForBuild } from './build/compiler/index.js';
import { buildAllCSS } from './build/processors/css-builder.js';
import { copyAllStaticAssets } from './build/processors/asset-processor.js';
import { generateProductionHTML } from './build/generators/html-generator.js';
import { generateSitemap } from './build/generators/sitemap-generator.js';
import { generateRobots } from './build/generators/robots-generator.js';

export async function buildProduction(options = {}) {
  const root = options.root || process.cwd();
  const buildDir = join(root, '.bertuibuild');
  const outDir = join(root, 'dist');
  
  logger.bigLog('BUILDING WITH SERVER ISLANDS 🏝️', { color: 'green' });
  logger.info('🔥 OPTIONAL SERVER CONTENT - THE GAME CHANGER');
  
  // Clean directories
  if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
  if (existsSync(outDir)) rmSync(outDir, { recursive: true });
  mkdirSync(buildDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  
  const startTime = Date.now();
  
  try {
    // Step 0: Environment
    logger.info('Step 0: Loading environment variables...');
    const envVars = loadEnvVariables(root);
    
    // ✅ NEW: Step 0.5: Load config and run Page Builder
    const { loadConfig } = await import('./config/loadConfig.js');
    const config = await loadConfig(root);
    
    if (config.pageBuilder) {
      logger.info('Step 0.5: Running Page Builder...');
      await runPageBuilder(root, config);
    }
    
    // Step 1: Compilation
    logger.info('Step 1: Compiling and detecting Server Islands...');
    const { routes, serverIslands, clientRoutes } = await compileForBuild(root, buildDir, envVars);
    
    if (serverIslands.length > 0) {
      logger.bigLog('SERVER ISLANDS DETECTED 🏝️', { color: 'cyan' });
      logger.table(serverIslands.map(r => ({
        route: r.route,
        file: r.file,
        mode: '🏝️ Server Island (SSG)'
      })));
    }
    
    // Step 2: CSS Processing
    logger.info('Step 2: Combining CSS...');
    await buildAllCSS(root, outDir);
    
    // Step 3: Assets
    logger.info('Step 3: Copying static assets...');
    await copyAllStaticAssets(root, outDir);
    
    // Step 4: JavaScript Bundling
    logger.info('Step 4: Bundling JavaScript...');
    const buildEntry = join(buildDir, 'main.js');
    const result = await bundleJavaScript(buildEntry, outDir, envVars);
    
    // Step 5: HTML Generation
    logger.info('Step 5: Generating HTML with Server Islands...');
    await generateProductionHTML(root, outDir, result, routes, serverIslands, config);
    
    // Step 6: Sitemap
    logger.info('Step 6: Generating sitemap.xml...');
    await generateSitemap(routes, config, outDir);
    
    // Step 7: Robots.txt
    logger.info('Step 7: Generating robots.txt...');
    await generateRobots(config, outDir, routes);
    
    // Cleanup
    if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
    
    // Summary
    const duration = Date.now() - startTime;
    showBuildSummary(routes, serverIslands, clientRoutes, duration);
    
  } catch (error) {
    logger.error(`Build failed: ${error.message}`);
    if (error.stack) logger.error(error.stack);
    if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
    process.exit(1);
  }
}

async function bundleJavaScript(buildEntry, outDir, envVars) {
  const result = await Bun.build({
    entrypoints: [buildEntry],
    outdir: join(outDir, 'assets'),
    target: 'browser',
    minify: true,
    splitting: true,
    sourcemap: 'external',
    naming: {
      entry: '[name]-[hash].js',
      chunk: 'chunks/[name]-[hash].js',
      asset: '[name]-[hash].[ext]'
    },
    external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
    define: {
      'process.env.NODE_ENV': '"production"',
      ...Object.fromEntries(
        Object.entries(envVars).map(([key, value]) => [
          `process.env.${key}`,
          JSON.stringify(value)
        ])
      )
    }
  });
  
  if (!result.success) {
    logger.error('JavaScript build failed!');
    result.logs.forEach(log => logger.error(log.message));
    process.exit(1);
  }
  
  logger.success('JavaScript bundled');
  return result;
}

function showBuildSummary(routes, serverIslands, clientRoutes, duration) {
  logger.success(`✨ Build complete in ${duration}ms`);
  logger.bigLog('BUILD SUMMARY', { color: 'green' });
  logger.info(`📄 Total routes: ${routes.length}`);
  logger.info(`🏝️  Server Islands (SSG): ${serverIslands.length}`);
  logger.info(`⚡ Client-only: ${clientRoutes.length}`);
  logger.info(`🗺️  Sitemap: dist/sitemap.xml`);
  logger.info(`🤖 robots.txt: dist/robots.txt`);
  
  if (serverIslands.length > 0) {
    logger.success('✅ Server Islands enabled - INSTANT content delivery!');
  }
  
  logger.bigLog('READY TO DEPLOY 🚀', { color: 'green' });
}