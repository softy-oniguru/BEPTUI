/**
 * @file src/router/SSRRouter.tsx
 */

import { h, createContext, FunctionalComponent } from "preact"
import { useContext, useEffect, useRef, useState } from "preact/hooks"
import type { ComponentChildren } from "preact"

/*───────────────────────────────────────────────────────────────────────────*\
  Types
\*───────────────────────────────────────────────────────────────────────────*/

type Route =
  {
    type      : "static"
    path      : string
    component : FunctionalComponent<any>
  }
| {
    type       : "dynamic"
    path       : string
    regex?     : RegExp
    paramNames?: string[]
    component  : FunctionalComponent<any>
  }

type Match =
  {
    route  : Route
    params : Record<string, string>
  }

type RouterValue =
  {
    pathname : string
    params   : Record<string, string>
    navigate : (path : string) => void
    isSSR    : boolean
  }

/*───────────────────────────────────────────────────────────────────────────*\
  Context
\*───────────────────────────────────────────────────────────────────────────*/

const RouterContext = createContext<RouterValue | null>(null)

/*───────────────────────────────────────────────────────────────────────────*\
  Constants
\*───────────────────────────────────────────────────────────────────────────*/

const EMPTY_PARAMS : Record<string, string> = Object.freeze({})

/*───────────────────────────────────────────────────────────────────────────*\
  Compile routes once
\*───────────────────────────────────────────────────────────────────────────*/

/**
 * Precompile dynamic routes → no regex allocation during render
 */
function compile(routes : Route[]) : Route[] {
  const out : Route[] = []

  for (const r of routes) {
    if (r.type === "static") {
      out.push(r)
      continue
    }

    const paramNames =
      [...r.path.matchAll(/\[([^\]]+)\]/g)].map(m => m[1])

    const pattern =
      r.path.replace(/\[([^\]]+)\]/g, "([^/]+)")

    out.push({
      ...r,
      regex      : new RegExp("^" + pattern + "$"),
      paramNames
    })
  }

  return out
}

/*───────────────────────────────────────────────────────────────────────────*\
  Match helper
\*───────────────────────────────────────────────────────────────────────────*/

/**
 * Match path against compiled routes
 */
function match(path : string, routes : Route[]) : Match | null {

  for (const r of routes) {
    if (r.type === "static") {
      if (r.path === path) {
        return { route : r, params : EMPTY_PARAMS }
      }
      continue
    }

    const m = path.match(r.regex!)
    if (!m) continue

    const params : Record<string, string> = {}

    for (let i = 0; i < r.paramNames!.length; i++) {
      params[r.paramNames![i]] = m[i + 1]
    }

    return { route : r, params }
  }

  return null
}

/*───────────────────────────────────────────────────────────────────────────*\
  Hook
\*───────────────────────────────────────────────────────────────────────────*/

/**
 * SSR-safe router accessor
 */
export function useRouter() : RouterValue {
  const ctx = useContext(RouterContext)

  if (!ctx) {
    return {
      pathname : "/",
      params   : EMPTY_PARAMS,
      navigate : () => {},
      isSSR    : true
    }
  }

  return ctx
}

/*───────────────────────────────────────────────────────────────────────────*\
  Router
\*───────────────────────────────────────────────────────────────────────────*/

type Props =
  {
    routes      : Route[]
    initialPath : string
  }

/**
 * SSR + CSR router
 * Single match on server
 * Zero regex allocation on client
 */
export const SSRRouter : FunctionalComponent<Props> = ({
  routes,
  initialPath
}) => {

  const isSSR = typeof window === "undefined"

  /* compile once */
  const compiled = useRef<Route[]>(compile(routes))

  /* initial match (SSR or first client render) */
  const initialMatch =
    match(isSSR ? initialPath : window.location.pathname, compiled.current)

  const [current, setCurrent] =
    useState<Route | null>(initialMatch?.route ?? null)

  const [params, setParams] =
    useState<Record<string, string>>(initialMatch?.params ?? EMPTY_PARAMS)

  const [pathname, setPathname] =
    useState(isSSR ? initialPath : window.location.pathname)

  /**
   * Apply route (client only)
   */
  function apply(path : string) {
    const m = match(path, compiled.current)

    if (m) {
      setCurrent(m.route)
      setParams(m.params)
    } else {
      setCurrent(null)
      setParams(EMPTY_PARAMS)
    }

    setPathname(path)
  }

  /**
   * Client navigation
   */
  function navigate(path : string) {
    if (isSSR) return
    window.history.pushState(null, "", path)
    apply(path)
  }

  /* client lifecycle */
  useEffect(() => {
    if (isSSR) return

    const onPop = () => apply(window.location.pathname)

    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const value : RouterValue =
    {
      pathname,
      params,
      navigate,
      isSSR
    }

  const Cmp = current?.component ?? NotFound

  return h(
    RouterContext.Provider,
    { value },
    h(Cmp, { params })
  )
}

/*───────────────────────────────────────────────────────────────────────────*\
  Link
\*───────────────────────────────────────────────────────────────────────────*/

type LinkProps =
  {
    to       : string
    children : ComponentChildren
  } & JSX.HTMLAttributes<HTMLAnchorElement>

/**
 * SSR-safe link (native on server)
 */
export const Link : FunctionalComponent<LinkProps> = ({
  to,
  children,
  ...rest
}) => {

  const { navigate, isSSR } = useRouter()

  function onClick(e : MouseEvent) {
    if (isSSR) return
    e.preventDefault()
    navigate(to)
  }

  return h("a", { href : to, onClick, ...rest }, children)
}

/*───────────────────────────────────────────────────────────────────────────*\
  NotFound
\*───────────────────────────────────────────────────────────────────────────*/

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
