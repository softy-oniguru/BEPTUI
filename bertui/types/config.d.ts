// ============================================
// FILE: bertui/types/config.d.ts (UPDATED)
// ============================================

declare module 'bertui/config' {
  export interface BertuiConfig {
    siteName?: string;
    baseUrl?: string;
    
    meta?: {
      title?: string;
      description?: string;
      keywords?: string;
      author?: string;
      ogImage?: string;
      ogTitle?: string;
      ogDescription?: string;
      themeColor?: string;
      lang?: string;
    };
    
    appShell?: {
      loading?: boolean;
      loadingText?: string;
      backgroundColor?: string;
    };
    
    robots?: {
      disallow?: string[];
      crawlDelay?: number;
    };
    
    // ✅ NEW: PageBuilder configuration
    pageBuilder?: {
      /** Enable PageBuilder plugin */
      enabled?: boolean;
      /** Array of data sources */
      sources?: PageBuilderSource[];
    };
  }

  export interface PageBuilderSource {
    /** Source name (for logging) */
    name: string;
    /** API endpoint URL */
    endpoint: string;
    /** HTTP method (default: GET) */
    method?: string;
    /** Request headers */
    headers?: Record<string, string>;
    /** Request body (for POST) */
    body?: any;
    /** Path to template file (e.g., "./src/templates/blog-post.jsx") */
    template: string;
    /** Output path pattern (e.g., "./src/pages/blog/[slug].jsx") */
    output: string;
    /** Data structure mapping */
    dataStructure: {
      /** Path to array in API response (e.g., "data.posts") */
      array: string;
      /** Field mappings (template variable: API path) */
      item: Record<string, string>;
    };
    /** Fallback value for missing data */
    fallback?: string;
  }

  export const defaultConfig: BertuiConfig;
  export function loadConfig(root: string): Promise<BertuiConfig>;
}