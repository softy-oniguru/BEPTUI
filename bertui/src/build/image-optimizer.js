// bertui/src/build/image-optimizer.js
import { join, extname, basename, dirname } from 'path';
import { existsSync, mkdirSync, readdirSync, statSync, cpSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * Optimize images using Bun's native image processing
 * This is FAST because it uses native code under the hood
 */
export async function optimizeImages(srcDir, outDir) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
  let optimized = 0;
  let totalSaved = 0;

  logger.info('🖼️  Optimizing images...');

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
              logger.debug(`Optimized: ${entry.name} (saved ${(result.saved / 1024).toFixed(2)}KB)`);
            }
          } catch (error) {
            logger.warn(`Failed to optimize ${entry.name}: ${error.message}`);
            // Fallback: just copy the file
            cpSync(srcPath, destPath);
          }
        }
      }
    }
  }

  await processDirectory(srcDir, outDir);

  if (optimized > 0) {
    logger.success(`Optimized ${optimized} images (saved ${(totalSaved / 1024).toFixed(2)}KB)`);
  }

  return { optimized, saved: totalSaved };
}

/**
 * Optimize a single image using Bun's native capabilities
 * Falls back to direct copy if optimization fails
 */
async function optimizeImage(srcPath, destPath) {
  const ext = extname(srcPath).toLowerCase();
  const originalFile = Bun.file(srcPath);
  const originalSize = originalFile.size;

  try {
    // Read the image
    const imageBuffer = await originalFile.arrayBuffer();

    // For PNG/JPEG, we can optimize
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      // Use Bun's native image optimization
      // This is fast because it uses native C libraries
      const optimized = await optimizeWithBun(imageBuffer, ext);
      
      if (optimized && optimized.byteLength < originalSize) {
        await Bun.write(destPath, optimized);
        const saved = originalSize - optimized.byteLength;
        return { saved, originalSize, newSize: optimized.byteLength };
      }
    }

    // For other formats or if optimization didn't help, just copy
    cpSync(srcPath, destPath);
    return null;
  } catch (error) {
    // If anything fails, just copy the original
    cpSync(srcPath, destPath);
    return null;
  }
}

/**
 * Optimize using Bun's native capabilities
 * This is a placeholder - Bun doesn't have built-in image optimization yet
 * We'll use a fast external library via Bun's FFI or shell commands
 */
async function optimizeWithBun(buffer, ext) {
  try {
    // For now, we'll use oxipng and mozjpeg via shell commands
    // These are the FASTEST available options (Rust-based)
    const tempInput = `/tmp/bertui_input_${Date.now()}${ext}`;
    const tempOutput = `/tmp/bertui_output_${Date.now()}${ext}`;

    await Bun.write(tempInput, buffer);

    if (ext === '.png') {
      // Use oxipng (Rust-based, ultra-fast)
      const proc = Bun.spawn(['oxipng', '-o', '2', '--strip', 'safe', tempInput, '-o', tempOutput], {
        stdout: 'ignore',
        stderr: 'ignore'
      });
      await proc.exited;

      if (existsSync(tempOutput)) {
        const optimized = await Bun.file(tempOutput).arrayBuffer();
        // Cleanup
        Bun.spawn(['rm', tempInput, tempOutput]);
        return optimized;
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Use mozjpeg (fastest JPEG optimizer)
      const proc = Bun.spawn(['cjpeg', '-quality', '85', '-optimize', '-outfile', tempOutput, tempInput], {
        stdout: 'ignore',
        stderr: 'ignore'
      });
      await proc.exited;

      if (existsSync(tempOutput)) {
        const optimized = await Bun.file(tempOutput).arrayBuffer();
        // Cleanup
        Bun.spawn(['rm', tempInput, tempOutput]);
        return optimized;
      }
    }

    // Cleanup on failure
    if (existsSync(tempInput)) Bun.spawn(['rm', tempInput]);
    if (existsSync(tempOutput)) Bun.spawn(['rm', tempOutput]);

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if optimization tools are installed
 */
export async function checkOptimizationTools() {
  const tools = [];

  try {
    const oxipng = Bun.spawn(['which', 'oxipng'], { stdout: 'pipe' });
    await oxipng.exited;
    if (oxipng.exitCode === 0) {
      tools.push('oxipng');
    }
  } catch (e) {}

  try {
    const cjpeg = Bun.spawn(['which', 'cjpeg'], { stdout: 'pipe' });
    await cjpeg.exited;
    if (cjpeg.exitCode === 0) {
      tools.push('mozjpeg');
    }
  } catch (e) {}

  if (tools.length === 0) {
    logger.warn('⚠️  No image optimization tools found. Install for better performance:');
    logger.warn('   macOS:   brew install oxipng mozjpeg');
    logger.warn('   Ubuntu:  apt install oxipng mozjpeg');
    logger.warn('   Images will be copied without optimization.');
  } else {
    logger.success(`Found optimization tools: ${tools.join(', ')}`);
  }

  return tools;
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
        processDirectory(srcPath, destPath);
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
  logger.info(`Copied ${copied} images without optimization`);
  return copied;
}