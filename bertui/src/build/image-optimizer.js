// bertui/src/build/image-optimizer.js - WASM-POWERED VERSION 🚀
import { join, extname } from 'path';
import { existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * 🎯 WASM-powered image optimization using @jsquash
 * Zero OS dependencies, pure JavaScript, blazing fast!
 */

// Lazy-load WASM modules (only when needed)
let pngEncode, pngDecode;
let jpegEncode, jpegDecode;
let webpEncode, webpDecode;

async function initializePNG() {
  if (!pngEncode) {
    const { encode, decode } = await import('@jsquash/png');
    pngEncode = encode;
    pngDecode = decode;
  }
}

async function initializeJPEG() {
  if (!jpegEncode) {
    const { encode, decode } = await import('@jsquash/jpeg');
    jpegEncode = encode;
    jpegDecode = decode;
  }
}

async function initializeWebP() {
  if (!webpEncode) {
    const { encode, decode } = await import('@jsquash/webp');
    webpEncode = encode;
    webpDecode = decode;
  }
}

/**
 * Optimize images using WASM-powered codecs
 * This is FAST and has ZERO OS dependencies! 🚀
 */
export async function optimizeImages(srcDir, outDir) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
  let optimized = 0;
  let totalSaved = 0;

  logger.info('🖼️  Optimizing images with WASM codecs...');

  async function processDirectory(dir, targetDir) {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(dir, entry.name);
      const destPath = join(targetDir, entry.name);

      if (entry.isDirectory()) {
        if (!existsSync(destPath)) {
          mkdirSync(destPath, { recursive: true });
        }
        await processDirectory(srcPath, destPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();

        if (imageExtensions.includes(ext)) {
          try {
            const result = await optimizeImage(srcPath, destPath);
            if (result) {
              optimized++;
              totalSaved += result.saved;
              const savedPercent = ((result.saved / result.originalSize) * 100).toFixed(1);
              logger.debug(
                `✨ ${entry.name}: ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.newSize / 1024).toFixed(1)}KB (-${savedPercent}%)`
              );
            }
          } catch (error) {
            logger.warn(`⚠️  Failed to optimize ${entry.name}: ${error.message}`);
            // Fallback: just copy the file
            cpSync(srcPath, destPath);
          }
        }
      }
    }
  }

  await processDirectory(srcDir, outDir);

  if (optimized > 0) {
    logger.success(
      `✅ Optimized ${optimized} images (saved ${(totalSaved / 1024).toFixed(2)}KB total)`
    );
  }

  return { optimized, saved: totalSaved };
}

/**
 * Optimize a single image using WASM codecs
 */
async function optimizeImage(srcPath, destPath) {
  const ext = extname(srcPath).toLowerCase();
  const originalFile = Bun.file(srcPath);
  const originalSize = originalFile.size;

  try {
    // For SVG and GIF, just copy (no optimization needed/supported)
    if (ext === '.svg' || ext === '.gif') {
      cpSync(srcPath, destPath);
      return null;
    }

    // Read the original image
    const originalBuffer = await originalFile.arrayBuffer();

    let optimizedBuffer;

    if (ext === '.png') {
      await initializePNG();
      
      // Decode → Re-encode with compression
      const imageData = await pngDecode(originalBuffer);
      
      // Encode with oxipng-level compression (quality 85, similar to oxipng -o 2)
      optimizedBuffer = await pngEncode(imageData, { 
        quality: 85,
        effort: 2 // 0-10, higher = better compression but slower
      });
      
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await initializeJPEG();
      
      // Decode → Re-encode with quality 85 (mozjpeg-like quality)
      const imageData = await jpegDecode(originalBuffer);
      optimizedBuffer = await jpegEncode(imageData, { quality: 85 });
      
    } else if (ext === '.webp') {
      await initializeWebP();
      
      // WebP optimization
      const imageData = await webpDecode(originalBuffer);
      optimizedBuffer = await webpEncode(imageData, { quality: 85 });
    }

    // Only save if we actually reduced the size
    if (optimizedBuffer && optimizedBuffer.byteLength < originalSize) {
      await Bun.write(destPath, optimizedBuffer);
      const saved = originalSize - optimizedBuffer.byteLength;
      return { saved, originalSize, newSize: optimizedBuffer.byteLength };
    }

    // If optimization didn't help, just copy the original
    cpSync(srcPath, destPath);
    return null;
    
  } catch (error) {
    // If anything fails, just copy the original
    logger.warn(`Optimization failed for ${srcPath.split('/').pop()}, copying original`);
    cpSync(srcPath, destPath);
    return null;
  }
}

/**
 * Check if optimization is available (always true with WASM! 🎉)
 */
export async function checkOptimizationTools() {
  try {
    // Try to import the WASM modules
    await import('@jsquash/png');
    await import('@jsquash/jpeg');
    await import('@jsquash/webp');
    
    logger.success('✅ WASM image optimization available');
    logger.info('📦 Using @jsquash (zero OS dependencies!)');
    return ['png', 'jpeg', 'webp'];
  } catch (error) {
    logger.error('❌ WASM codecs not installed. Run: bun add @jsquash/png @jsquash/jpeg @jsquash/webp');
    return [];
  }
}

/**
 * Copy images without optimization (fallback)
 */
export function copyImages(srcDir, outDir) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif'];
  let copied = 0;

  function processDirectory(dir, targetDir) {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(dir, entry.name);
      const destPath = join(targetDir, entry.name);

      if (entry.isDirectory()) {
        if (!existsSync(destPath)) {
          mkdirSync(destPath, { recursive: true });
        }
        processDirectory(srcPath, targetDir);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();

        if (imageExtensions.includes(ext)) {
          cpSync(srcPath, destPath);
          copied++;
        }
      }
    }
  }

  processDirectory(srcDir, outDir);
  logger.info(`📋 Copied ${copied} images without optimization`);
  return copied;
}