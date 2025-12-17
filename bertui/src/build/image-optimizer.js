// bertui/src/build/image-optimizer.js - SIMPLE & STABLE
import { join, extname } from 'path';
import { existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * Simple, reliable image copying
 * No WASM, no optimization, just copy files
 */

export async function optimizeImages(srcDir, outDir) {
  // Alias for copyImages to maintain API
  logger.info(`📁 Copying from ${srcDir} to ${outDir}...`);
  const copied = copyImages(srcDir, outDir);
  return { optimized: 0, saved: 0, copied };
}

export async function checkOptimizationTools() {
  // Always return empty array to disable optimization
  return [];
}

export function copyImages(srcDir, outDir) {
  // All common image formats
  const imageExtensions = [
    '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', 
    '.avif', '.ico', '.bmp', '.tiff', '.tif'
  ];
  
  let copied = 0;
  let skipped = 0;

  if (!existsSync(srcDir)) {
    logger.warn(`⚠️  Source not found: ${srcDir}`);
    return 0;
  }

  // Ensure output directory exists
  mkdirSync(outDir, { recursive: true });

  function processDirectory(dir, targetDir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = join(dir, entry.name);
        const destPath = join(targetDir, entry.name);

        if (entry.isDirectory()) {
          // Recursively process subdirectories
          const subDestPath = join(targetDir, entry.name);
          mkdirSync(subDestPath, { recursive: true });
          processDirectory(srcPath, subDestPath);
        } else if (entry.isFile()) {
          const ext = extname(entry.name).toLowerCase();

          if (imageExtensions.includes(ext)) {
            try {
              cpSync(srcPath, destPath);
              copied++;
            } catch (error) {
              logger.warn(`  Failed to copy ${entry.name}: ${error.message}`);
              skipped++;
            }
          } else {
            skipped++;
          }
        }
      }
    } catch (error) {
      logger.error(`Error processing ${dir}: ${error.message}`);
    }
  }

  processDirectory(srcDir, outDir);

  if (copied > 0) {
    logger.success(`✅ Copied ${copied} image(s) to ${outDir}`);
  }
  
  if (skipped > 0) {
    logger.info(`📝 Skipped ${skipped} non-image file(s)`);
  }

  return copied;
}