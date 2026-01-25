// ============================================
// FILE: bertui/src/dev.js (COMPLETE UPDATED VERSION)
// ============================================

import { compileProject } from './client/compiler.js';
import { startDevServer } from './server/dev-server.js';
import logger from './logger/logger.js';
import { loadConfig } from './config/loadConfig.js';
import { watch } from 'fs';
import { join, existsSync } from 'path';

export async function startDev(options = {}) {
  const root = options.root || process.cwd();
  const port = options.port || 3000;
  
  try {
    const config = await loadConfig(root);
    
    // ✅ NEW: Run PageBuilder on dev server start
    if (config.pageBuilder?.enabled) {
      logger.info('🔧 Checking for PageBuilder plugin...');
      
      try {
        const { runPageBuilder } = await import('bertui-pagebuilder');
        
        logger.success('✅ bertui-pagebuilder detected');
        logger.info('🔧 Running initial PageBuilder generation...');
        
        await runPageBuilder(root, config);
        
        logger.success('✅ PageBuilder initial run complete');
        
      } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND' || error.code === 'ERR_MODULE_NOT_FOUND') {
          logger.warn('⚠️  PageBuilder enabled in config but package not installed!');
          logger.info('   Install with: bun add bertui-pagebuilder');
        } else {
          logger.error(`❌ PageBuilder failed: ${error.message}`);
        }
      }
    }
    
    // ✅ NEW: Watch config file for PageBuilder changes
    const configPath = join(root, 'bertui.config.js');
    
    if (existsSync(configPath)) {
      watch(configPath, async (eventType) => {
        if (eventType === 'change') {
          logger.info('📝 Config file changed, checking PageBuilder...');
          
          try {
            const newConfig = await loadConfig(root);
            
            if (newConfig.pageBuilder?.enabled) {
              logger.info('🔄 Re-running PageBuilder...');
              
              const { runPageBuilder } = await import('bertui-pagebuilder');
              await runPageBuilder(root, newConfig);
              
              logger.success('✅ PageBuilder re-run complete');
              logger.info('🔄 Recompiling project...');
              
              await compileProject(root);
            }
          } catch (error) {
            logger.error(`Config reload failed: ${error.message}`);
          }
        }
      });
    }
    
    // Step 1: Compile project
    logger.info('Step 1: Compiling project...');
    await compileProject(root);
    
    // Step 2: Start dev server
    logger.info('Step 2: Starting dev server...');
    await startDevServer({ root, port });
    
  } catch (error) {
    logger.error(`Dev server failed: ${error.message}`);
    process.exit(1);
  }
}