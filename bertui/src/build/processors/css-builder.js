// bertui/src/build/processors/css-builder.js
import { join } from 'path';
import { existsSync, readdirSync, mkdirSync } from 'fs';
import logger from '../../logger/logger.js';
import { buildCSS } from '../css-builder.js';

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
    
    let combinedCSS = '';
    for (const cssFile of cssFiles) {
      const srcPath = join(srcStylesDir, cssFile);
      const file = Bun.file(srcPath);
      const cssContent = await file.text();
      combinedCSS += `/* ${cssFile} */\n${cssContent}\n\n`;
    }
    
    const combinedPath = join(stylesOutDir, 'bertui.min.css');
    await Bun.write(combinedPath, combinedCSS);
    await buildCSS(combinedPath, combinedPath);
    
    logger.success(`✅ Combined ${cssFiles.length} CSS files`);
  }
}