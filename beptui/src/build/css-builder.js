import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { transform } from 'lightningcss';
import logger from '../logger/logger.js';

/**
 * Build and minify CSS for production using Lightning CSS
 * @param {string} srcPath - Source CSS file path
 * @param {string} destPath - Destination CSS file path
 */
export async function buildCSS(srcPath, destPath) {
  try {
    logger.info(`Processing CSS: ${srcPath.split('/').pop()}`);
    
    // Ensure destination directory exists
    const destDir = join(destPath, '..');
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    // Read source CSS
    const css = await Bun.file(srcPath).text();
    const originalSize = Buffer.byteLength(css);
    
    // Transform with Lightning CSS (blazing fast)
    const { code } = transform({
      filename: srcPath,
      code: Buffer.from(css),
      minify: true,
      sourceMap: false,
      targets: {
        // Support last 2 versions of major browsers
        chrome: 90 << 16,
        firefox: 88 << 16,
        safari: 14 << 16,
        edge: 90 << 16
      },
      drafts: {
        nesting: true // Enable CSS nesting
      }
    });
    
    // Write minified CSS
    await Bun.write(destPath, code);
    
    // Calculate size reduction
    const minifiedSize = code.length;
    const originalKB = (originalSize / 1024).toFixed(2);
    const minifiedKB = (minifiedSize / 1024).toFixed(2);
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    
    logger.success(`CSS minified: ${originalKB}KB → ${minifiedKB}KB (-${reduction}%)`);
    
    return { success: true, size: minifiedKB };
  } catch (error) {
    logger.error(`CSS build failed: ${error.message}`);
    throw error;
  }
}

/**
 * Copy CSS without minification (for dev)
 * @param {string} srcPath - Source CSS file path
 * @param {string} destPath - Destination CSS file path
 */
export async function copyCSS(srcPath, destPath) {
  try {
    const destDir = join(destPath, '..');
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    await Bun.write(destPath, Bun.file(srcPath));
    logger.info('CSS copied for development');
    
    return { success: true };
  } catch (error) {
    logger.error(`CSS copy failed: ${error.message}`);
    throw error;
  }
}