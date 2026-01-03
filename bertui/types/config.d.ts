// bertui/types/config.d.ts
declare module 'bertui/config' {
  /**
   * BertUI Configuration
   */
  export interface BertuiConfig {
    /** Site name for SEO */
    siteName?: string;
    
    /** Base URL for sitemap generation (e.g., "https://example.com") */
    baseUrl?: string;
    
    /** HTML meta tags configuration */
    meta?: {
      /** Page title */
      title?: string;
      /** Meta description */
      description?: string;
      /** Meta keywords */
      keywords?: string;
      /** Author name */
      author?: string;
      /** Open Graph image URL */
      ogImage?: string;
      /** Open Graph title */
      ogTitle?: string;
      /** Open Graph description */
      ogDescription?: string;
      /** Theme color */
      themeColor?: string;
      /** Language code (e.g., "en") */
      lang?: string;
    };
    
    /** App shell configuration */
    appShell?: {
      /** Show loading indicator */
      loading?: boolean;
      /** Loading text */
      loadingText?: string;
      /** Background color */
      backgroundColor?: string;
    };
    
    /** robots.txt configuration */
    robots?: {
      /** Paths to disallow in robots.txt */
      disallow?: string[];
      /** Crawl delay in seconds */
      crawlDelay?: number;
    };
  }

  /**
   * Page meta configuration (exported from page files)
   */
  export interface PageMeta {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    themeColor?: string;
    lang?: string;
    publishedDate?: string;
    updatedDate?: string;
  }

  /**
   * Default BertUI configuration
   */
  export const defaultConfig: BertuiConfig;

  /**
   * Load BertUI configuration from bertui.config.js
   */
  export function loadConfig(root: string): Promise<BertuiConfig>;
}