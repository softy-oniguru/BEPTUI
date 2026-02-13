/**
 * @file src/router/Router.ts
 */

import { h, createContext, FunctionalComponent } from "preact"
import { useContext, useEffect, useRef, useState } from "preact/hooks"
import type { ComponentChildren } from "preact"

/*───────────────────────────────────────────────────────────────────────────*\
  Types
\*───────────────────────────────────────────────────────────────────────────*/

type RouteInput =
  {
    type: "static", path: string
    component: FunctionalComponent<any>
  } | {
    type: "dynamic", path: string
    component : FunctionalComponent<any>
  }

type CompiledRoute =
  {
    type: "static", path: string,
    component: FunctionalComponent<any>,
  } | {
    type: "dynamic", path: string,
    regex: RegExp, params: string[],
    component: FunctionalComponent<any>,
  }

type RouterValue = {
  route: CompiledRoute | null, params: Record<string, string>,
  navigate: (path : string) => void, pathname: string, isSSR: boolean,
}

/*───────────────────────────────────────────────────────────────────────────*\
  Constants
\*───────────────────────────────────────────────────────────────────────────*/

const RouterContext = createContext<RouterValue|null>(null)
const EMPTY_PARAMS: Record<string,string> = Object.freeze({})

/*───────────────────────────────────────────────────────────────────────────*\
  Utils
\*───────────────────────────────────────────────────────────────────────────*/

/**
 * Precompile dynamic routes
 * 
 * @param routes RouteInput[]
 * @returns CompiledRoute[]
 */
function compileRoutes(
  routes: RouteInput[]
): CompiledRoute[] {
  const out: CompiledRoute[] = []

  for (const route of routes) {
    if (route.type === "static") {
      out.push(route); continue
    }

    const params = [...route.path.matchAll(/\[([^\]]+)\]/g)].map(match => match[1])
    const pattern = route.path.replace(/\[([^\]]+)\]/g, "([^/]+)") // pattern

    out.push({
      type: "dynamic", path: route.path,
      regex: new RegExp("^" + pattern + "$"),
      params, component: route.component
    })
  }

  return out
}

/**
 * Match path against compiled routes
 * 
 * @param path string
 * @param routes CompiledRoute[]
 * @returns [CompiledRoute | null, Record<string,string>]
 */
function matchRoute(
  path   : string,
  routes : CompiledRoute[]
): [
  CompiledRoute | null,
  Record<string, string>
] {
  for (const route of routes) {
    if (route.type === "static") {
      if (route.path === path) return [route, EMPTY_PARAMS]
    continue; }

    const match = path.match(route.regex); if (!match) continue;

    const params: Record<string,string> = {}
    for (let i = 0; i < route.params.length; i++) {
      params[route.params[i]] = match[i + 1]
    };

    return [route, params]
  }

  return [null, EMPTY_PARAMS]
}

/*───────────────────────────────────────────────────────────────────────────*\
  Hook
\*───────────────────────────────────────────────────────────────────────────*/

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)

  if (typeof window === "undefined") { return {
    route: null, params: EMPTY_PARAMS,
    navigate: () => {}, pathname: "/",
    isSSR: true,
  }}

  if (!ctx) { throw new Error(
    "useRouter must be used inside Router"
  )}; return ctx
}

/*───────────────────────────────────────────────────────────────────────────*\
  Router
\*───────────────────────────────────────────────────────────────────────────*/

type RouterProps = {
  routes : RouteInput[]
  url?   : string
}

/**
 * Tiny router for Bun + Preact + SSR
 * No runtime regex creation | No object churn
 */
export const Router: FunctionalComponent<RouterProps> = ({ routes, url }) => {
  const isSSR        = typeof window === "undefined"
  const initialPath  = isSSR ? (url ?? "/") : window.location.pathname

  /* compile once */
  const compiledRef  = useRef<CompiledRoute[]>(compileRoutes(routes))

  /* state */
  const [route,  setRoute ] = useState<CompiledRoute | null>(null)
  const [params, setParams] = useState<Record<string, string>>(EMPTY_PARAMS)
  const [path,   setPath  ] = useState(initialPath)

  /**
   * Apply route without reallocations
   */
  function apply(pathname : string) {
    const [r, p] = matchRoute(pathname, compiledRef.current)
    setRoute(r); setParams(p); setPath(pathname)
  }

  /**
   * Navigate (client only)
   */
  function navigate(pathname: string) {
    if (isSSR) return;
    window.history.pushState(
      null, "", pathname
    ); apply(pathname);
  }

  /**
   * Client Lifecycle
   */
  useEffect(() => {
    if (isSSR) return;
    apply(window.location.pathname);

    const onPop = () => apply(
      window.location.pathname
    );

    window.addEventListener("popstate", onPop); // register
    return () => window.removeEventListener("popstate", onPop);
  }, [])

  const value: RouterValue = {
    route: route, params,
    navigate, pathname: path,
    isSSR
  }

  return h(RouterContext.Provider, { value },
    h(route?.component ?? NotFound, { params })
  )
}

/*───────────────────────────────────────────────────────────────────────────*\
  Link
\*───────────────────────────────────────────────────────────────────────────*/

type LinkProps = {
  to: string, children: ComponentChildren
} & JSX.HTMLAttributes<HTMLAnchorElement>

/**
 * Zero-overhead link
 */
export const Link : FunctionalComponent<LinkProps> = ({
  to, children, ...rest
}) => {
  let router : RouterValue | null = null

  try { router = useRouter() }
  catch { router = null }

  function onClick(e : MouseEvent) {
    if (!router || router.isSSR) return
    e.preventDefault(); router.navigate(to)
  }

  return h("a", {
    href: to, onClick,
    ...rest // unpack
  }, children)
}

/*───────────────────────────────────────────────────────────────────────────*\
  NotFound
\*───────────────────────────────────────────────────────────────────────────*/

// from ai code (i'm too lazyyy)
const NotFound : FunctionalComponent = () =>
  h("div",
    {
      style : {
        display        : "flex",
        flexDirection  : "column",
        alignItems     : "center",
        justifyContent : "center",
        minHeight      : "100vh",
        fontFamily     : "system-ui"
      }
    },
    [
      h("h1", { style : { fontSize : "6rem", margin : 0 } }, "404"),
      h("p",  { style : { fontSize : "1.5rem", color : "#666" } }, "Page not found"),
      h("a",
        {
          href  : "/",
          style : {
            color           : "#10b981",
            textDecoration  : "none",
            fontSize        : "1.2rem"
          }
        },
        "Go home"
      )
    ]
  )
