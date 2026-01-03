// bertui/src/build/compiler/index.js
import { join } from 'path';
import { existsSync } from 'fs';
import logger from '../../logger/logger.js';
import { discoverRoutes } from './route-discoverer.js';
import { compileBuildDirectory } from './file-transpiler.js';
import { generateBuildRouter } from './router-generator.js';


export async function compileForBuild(root, buildDir, envVars) {
  const srcDir = join(root, 'src');
  const pagesDir = join(srcDir, 'pages');
  
  if (!existsSync(srcDir)) {
    throw new Error('src/ directory not found!');
  }
  
  let routes = [];
  let serverIslands = [];
  let clientRoutes = [];
  
  if (existsSync(pagesDir)) {
    routes = await discoverRoutes(pagesDir);
    
    for (const route of routes) {
      const sourceCode = await Bun.file(route.path).text();
      const isServerIsland = sourceCode.includes('export const render = "server"');
      
      if (isServerIsland) {
        serverIslands.push(route);
        logger.success(`🏝️  Server Island: ${route.route}`);
      } else {
        clientRoutes.push(route);
      }
    }
  }
  
  await compileBuildDirectory(srcDir, buildDir, root, envVars);
  
  if (routes.length > 0) {
    await generateBuildRouter(routes, buildDir);
  }
  
  return { routes, serverIslands, clientRoutes };
}