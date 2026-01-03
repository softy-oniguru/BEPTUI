// src/config/loadConfig.js - COMPLETE CORRECTED VERSION
import { join } from 'path';
import { existsSync } from 'fs';
import { defaultConfig } from './defaultConfig.js';
import logger from '../logger/logger.js';

export async function loadConfig(root) {
  const configPath = join(root, 'bertui.config.js');
  
  // Check if user created config
  if (existsSync(configPath)) {
    try {
      const userConfig = await import(configPath);
      logger.success('Loaded bertui.config.js');
      
      // DEBUG: Show what we loaded
      logger.info(`📋 Config loaded: ${JSON.stringify({
        hasSiteName: !!(userConfig.default?.siteName || userConfig.siteName),
        hasBaseUrl: !!(userConfig.default?.baseUrl || userConfig.baseUrl),
        hasRobots: !!(userConfig.default?.robots || userConfig.robots)
      })}`);
      
      // Merge user config with defaults
      return mergeConfig(defaultConfig, userConfig.default || userConfig);
    } catch (error) {
      logger.error(`Failed to load config. Make sure bertui.config.js is in the root directory: ${error.message}`);
      return defaultConfig;
    }
  }
  
  logger.info('No config found, using defaults');
  return defaultConfig;
}

function mergeConfig(defaults, user) {
  // Start with user config (so user values override defaults)
  const merged = { ...user };
  
  // Deep merge for nested objects
  merged.meta = { ...defaults.meta, ...(user.meta || {}) };
  merged.appShell = { ...defaults.appShell, ...(user.appShell || {}) };
  merged.robots = { ...defaults.robots, ...(user.robots || {}) };
  
  // Ensure we have required top-level fields
  if (!merged.siteName) merged.siteName = defaults.siteName;
  if (!merged.baseUrl) merged.baseUrl = defaults.baseUrl;
  
  return merged;
}