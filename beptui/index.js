// ============================================
// FILE: bertui/index.js (Located in root)
// ============================================

// Compiler
export { compileProject, compileFile } from './src/client/compiler.js';
export { compileForBuild } from './src/build/compiler/index.js';
export { discoverRoutes } from './src/build/compiler/route-discoverer.js';

// HMR
export { hmr } from './src/client/hmr-runtime.js';

// Image Optimizer
export { 
  optimizeImage, 
  optimizeImagesBatch, 
  hasWasm, 
  version as optimizerVersion 
} from './src/image-optimizer/index.js';

// Build
export { buildProduction } from './src/build.js';
export { optimizeImages } from './src/build/image-optimizer.js';

// Router
export { Router, Link, useRouter } from './src/router/index.js';
export { SSRRouter } from './src/router/SSRRouter.js';

// Config
export { loadConfig, defaultConfig } from './src/config/index.js';

// Logger
export { default as logger } from './src/logger/logger.js';

// CLI
export { program } from './src/cli.js';

// Version
export const version = '1.2.0';

// Import for default export
import { compileProject, compileFile } from './src/client/compiler.js';
import { compileForBuild } from './src/build/compiler/index.js';
import { discoverRoutes } from './src/build/compiler/route-discoverer.js';
import { hmr } from './src/client/hmr-runtime.js';
import { optimizeImage, optimizeImagesBatch } from './src/image-optimizer/index.js';
import { optimizeImages } from './src/build/image-optimizer.js';
import { buildProduction } from './src/build.js';
import { Router, Link, useRouter } from './src/router/index.js';
import { SSRRouter } from './src/router/SSRRouter.js';
import { loadConfig, defaultConfig } from './src/config/index.js';
import logger from './src/logger/logger.js';
import { program } from './src/cli.js';

// Default export
export default {
  compileProject,
  compileFile,
  compileForBuild,
  discoverRoutes,
  hmr,
  optimizeImage,
  optimizeImagesBatch,
  optimizeImages,
  buildProduction,
  Router,
  Link,
  useRouter,
  SSRRouter,
  loadConfig,
  defaultConfig,
  logger,
  program,
  version: '1.2.0'
};