// bertui/types/index.d.ts

declare namespace React {
  type ReactNode = any;
}

declare global {
  namespace JSX {
    type Element = any;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
declare module 'bertui' {
  import { BertuiConfig } from 'bertui/config';
  
  /**
   * Logger utility
   */
  export interface Logger {
    info(message: string): void;
    success(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    bigLog(message: string, options?: { color?: string }): void;
    table(data: any[]): void;
  }

  /**
   * Build options
   */
  export interface BuildOptions {
    /** Project root directory */
    root?: string;
  }

  /**
   * Dev server options
   */
  export interface DevOptions {
    /** Server port */
    port?: number;
    /** Project root directory */
    root?: string;
  }

  /**
   * Compile options
   */
  export interface CompileOptions {
    /** Project root directory */
    root?: string;
  }

  /**
   * Logger instance
   */
  export const logger: Logger;

  /**
   * Default configuration
   */
  export const defaultConfig: BertuiConfig;

  /**
   * Load configuration
   */
  export function loadConfig(root: string): Promise<BertuiConfig>;

  /**
   * Start development server
   */
  export function startDev(options?: DevOptions): Promise<void>;

  /**
   * Build for production
   */
  export function buildProduction(options?: BuildOptions): Promise<void>;

  /**
   * Compile project
   */
  export function compileProject(root: string): Promise<{
    outDir: string;
    stats: { files: number; skipped: number };
    routes: any[];
  }>;

  /**
   * CLI program
   */
  export function program(): void;

  /**
   * BertUI version
   */
  export const version: string;
}

// Global declarations for Server Islands
declare global {
  /**
   * Mark a page component as a Server Island (SSG)
   * Add this export to any page to enable static generation:
   * 
   * @example
   * ```tsx
   * export const render = "server";
   * ```
   */
  export const render: "server" | "client";
}

export {};