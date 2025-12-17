// diagnostic.js - Run this to check your image setup
import { existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const root = process.cwd();

console.log('\n🔍 BertUI Image Diagnostic\n');
console.log('━'.repeat(50));

// Check src/images/
const srcImagesDir = join(root, 'src', 'images');
if (existsSync(srcImagesDir)) {
  console.log('\n✅ src/images/ exists');
  const images = readdirSync(srcImagesDir).filter(f => {
    const ext = extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext);
  });
  
  if (images.length > 0) {
    console.log(`📸 Found ${images.length} images:`);
    images.forEach(img => {
      const size = (statSync(join(srcImagesDir, img)).size / 1024).toFixed(1);
      console.log(`   - ${img} (${size}KB)`);
    });
  } else {
    console.log('⚠️  No images found in src/images/');
  }
} else {
  console.log('\n❌ src/images/ does not exist');
  console.log('💡 Create it with: mkdir -p src/images');
}

// Check public/
const publicDir = join(root, 'public');
if (existsSync(publicDir)) {
  console.log('\n✅ public/ exists');
  const files = readdirSync(publicDir);
  console.log(`📁 Found ${files.length} files:`);
  files.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('\n⚠️  public/ does not exist');
}

// Check dist/ (after build)
const distDir = join(root, 'dist');
if (existsSync(distDir)) {
  console.log('\n✅ dist/ exists (build has been run)');
  
  const distAssetsImages = join(distDir, 'assets', 'images');
  if (existsSync(distAssetsImages)) {
    const images = readdirSync(distAssetsImages);
    console.log(`📦 dist/assets/images/ contains ${images.length} files:`);
    images.forEach(img => {
      const size = (statSync(join(distAssetsImages, img)).size / 1024).toFixed(1);
      console.log(`   - ${img} (${size}KB)`);
    });
  } else {
    console.log('❌ dist/assets/images/ does not exist');
    console.log('💡 Images may not be getting copied during build');
  }
} else {
  console.log('\n⚠️  dist/ does not exist (build not run yet)');
  console.log('💡 Run: bun run build');
}

console.log('\n' + '━'.repeat(50));

// Check if @jsquash is installed
console.log('\n📦 Checking optimization dependencies:');
try {
  await import('@jsquash/png');
  console.log('✅ @jsquash/png installed');
} catch (e) {
  console.log('❌ @jsquash/png NOT installed');
  console.log('💡 Run: bun add @jsquash/png');
}

try {
  await import('@jsquash/jpeg');
  console.log('✅ @jsquash/jpeg installed');
} catch (e) {
  console.log('❌ @jsquash/jpeg NOT installed');
  console.log('💡 Run: bun add @jsquash/jpeg');
}

try {
  await import('@jsquash/webp');
  console.log('✅ @jsquash/webp installed');
} catch (e) {
  console.log('❌ @jsquash/webp NOT installed');
  console.log('💡 Run: bun add @jsquash/webp');
}

console.log('\n✨ Diagnostic complete!\n');