// bertui/src/build/image-optimizer.js - SIMPLE WORKING VERSION
import { join, extname } from 'path';
import { existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * Simple image copying - skip WASM optimization for now
 */
export async function optimizeImages(srcDir, outDir) {
  logger.info(`📋 Copying images from ${srcDir} to ${outDir}...`);
  const copied = copyImages(srcDir, outDir);
  return { optimized: 0, saved: 0, copied };
}

export async function checkOptimizationTools() {
  logger.info('📋 Image optimization disabled (simple mode)');
  return [];
}

export function copyImages(srcDir, outDir) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif', '.ico'];
  let copied = 0;

  // Check if source directory exists
  if (!existsSync(srcDir)) {
    logger.warn(`⚠️  Source directory not found: ${srcDir}`);
    return 0;
  }

  // Create output directory if it doesn't exist
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
    logger.info(`Created directory: ${outDir}`);
  }

  function processDirectory(dir, targetDir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      if (entries.length === 0) {
        logger.warn(`Directory empty: ${dir}`);
        return;
      }

      for (const entry of entries) {
        const srcPath = join(dir, entry.name);
        const destPath = join(targetDir, entry.name);

        if (entry.isDirectory()) {
          // Create subdirectory in target
          const subDestPath = join(targetDir, entry.name);
          if (!existsSync(subDestPath)) {
            mkdirSync(subDestPath, { recursive: true });
          }
          processDirectory(srcPath, subDestPath);
        } else if (entry.isFile()) {
          const ext = extname(entry.name).toLowerCase();

          if (imageExtensions.includes(ext)) {
            try {
              cpSync(srcPath, destPath);
              copied++;
              logger.debug(`  ✓ ${entry.name}`);
            } catch (error) {
              logger.warn(`  ✗ ${entry.name} - ${error.message}`);
            }
          } else {
            logger.debug(`  - ${entry.name} (skipped, not an image)`);
          }
        }
      }
    } catch (error) {
      logger.error(`Error processing directory ${dir}: ${error.message}`);
    }
  }

  logger.info(`Processing ${srcDir}...`);
  processDirectory(srcDir, outDir);
  
  if (copied > 0) {
    logger.success(`✅ Copied ${copied} images to ${outDir}`);
  } else {
    logger.warn(`⚠️  No images found in ${srcDir}`);
  }
  
  return copied;
}