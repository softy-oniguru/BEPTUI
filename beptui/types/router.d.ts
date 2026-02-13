// bertui/types/router.d.ts
declare module 'bertui/router' {
  import { ReactNode, ComponentType } from 'react';

  /**
   * Route parameter object
   */
  export interface RouteParams {
    [key: string]: string;
  }

  /**
   * Router context value
   */
  export interface RouterContext {
    /** Current active route */
    currentRoute: Route | null;
    /** Dynamic route parameters */
    params: RouteParams;
    /** Navigate to a new path */
    navigate: (path: string) => void;
    /** Current pathname */
    pathname: string;
    /** Whether running in SSR mode */
    isSSR?: boolean;
  }

  /**
   * Route configuration object
   */
  export interface Route {
    /** Route path (e.g., "/", "/blog", "/user/:id") */
    path: string;
    /** React component to render */
    component: ComponentType<{ params?: RouteParams }>;
    /** Route type: "static" or "dynamic" */
    type: 'static' | 'dynamic';
  }

  /**
   * Router component props
   */
  export interface RouterProps {
    /** Array of route configurations */
    routes: Route[];
    /** Initial path for SSR */
    initialPath?: string;
  }

  /**
   * Link component props
   */
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Destination path */
    to: string;
    /** Link content */
    children: ReactNode;
  }

  /**
   * Router component for client-side routing
   */
  export const Router: ComponentType<RouterProps>;

  /**
   * Link component for navigation
   */
  export const Link: ComponentType<LinkProps>;

  /**
   * Hook to access router context
   */
  export function useRouter(): RouterContext;

  /**
   * Exported routes configuration
   */
  export const routes: Route[];
}