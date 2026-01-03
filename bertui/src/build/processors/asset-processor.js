// bertui/src/build/processors/asset-processor.js
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs'; // ✅ ADD THIS IMPORT
import { copyImages } from '../image-optimizer.js';

export async function copyAllStaticAssets(root, outDir) {
  const publicDir = join(root, 'public');
  const srcImagesDir = join(root, 'src', 'images');
  
  if (existsSync(publicDir)) {
    copyImages(publicDir, outDir);
  }
  
  if (existsSync(srcImagesDir)) {
    const distImagesDir = join(outDir, 'images');
    mkdirSync(distImagesDir, { recursive: true });
    copyImages(srcImagesDir, distImagesDir);
  }
}