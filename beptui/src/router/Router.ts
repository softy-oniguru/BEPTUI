/**
 * @file src/router/Router.ts
 */

import { createContext, h, FunctionalComponent } from "preact"
import { useState, useEffect, useContext } from "preact/hooks"
import type { ComponentChildren } from "preact"

type Route = {
  type: "static" | "dynamic"
  path: string
  component: FunctionalComponent<any>
}

type RouterValue = {
  currentRoute: Route | null
  params: Record<string, string>
  navigate: (path: string) => void
  pathname: string
  isSSR: boolean
}

const RouterContext = createContext<RouterValue | null>(null)

/**
 * SSR-safe router hook
 */
export function useRouter(): RouterValue {
  const context = useContext(RouterContext)

  if (typeof window === "undefined") {
    return {
      pathname: "/",
      params: {},
      navigate: () => {},
      currentRoute: null,
      isSSR: true
    }
  }

  if (!context) {
    throw new Error("useRouter must be used within a Router component")
  }

  return context
}

type RouterProps = {
  routes: Route[]
  url?: string
}

/**
 * Router component
 */
export const Router: FunctionalComponent<RouterProps> = ({ routes, url }) => {
  const isSSR = typeof window === "undefined"
  const initialPath = isSSR ? (url ?? "/") : window.location.pathname

  const [currentRoute, setCurrentRoute] = useState<Route | null>(null)
  const [params, setParams] = useState<Record<string, string>>({})
  const [pathname, setPathname] = useState(initialPath)

  function matchRoute(path: string) {
    // static
    for (const route of routes) {
      if (route.type === "static" && route.path === path) {
        return { route, params: {} }
      }
    }

    // dynamic
    for (const route of routes) {
      if (route.type === "dynamic") {
        const pattern = route.path.replace(/\[([^\]]+)\]/g, "([^/]+)")
        const regex = new RegExp("^" + pattern + "$")
        const match = path.match(regex)

        if (match) {
          const paramNames = [...route.path.matchAll(/\[([^\]]+)\]/g)].map(
            m => m[1]
          )

          const extracted: Record<string, string> = {}

          paramNames.forEach((name, i) => {
            extracted[name] = match[i + 1]
          })

          return { route, params: extracted }
        }
      }
    }

    return { route: null, params: {} }
  }

  function applyRoute(path: string) {
    const { route, params } = matchRoute(path)
    setCurrentRoute(route)
    setParams(params)
    setPathname(path)
  }

  useEffect(() => {
    if (isSSR) return

    applyRoute(window.location.pathname)

    const handlePopState = () => {
      applyRoute(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [routes])

  function navigate(path: string) {
    if (isSSR) return
    window.history.pushState({}, "", path)
    applyRoute(path)
  }

  const routerValue: RouterValue = {
    currentRoute,
    params,
    navigate,
    pathname,
    isSSR
  }

  const Component = currentRoute?.component

  return h(
    RouterContext.Provider,
    { value: routerValue },
    Component ? h(Component, { params }) : h(NotFound, null)
  )
}

/**
 * Link component
 */
type LinkProps = {
  to: string
  children: ComponentChildren
} & JSX.HTMLAttributes<HTMLAnchorElement>

export const Link: FunctionalComponent<LinkProps> = ({
  to,
  children,
  ...props
}) => {
  let router: RouterValue | null = null

  try {
    router = useRouter()
  } catch {
    router = null
  }

  function handleClick(e: MouseEvent) {
    if (typeof window === "undefined") return
    if (!router) return

    e.preventDefault()
    router.navigate(to)
  }

  return h("a", { href: to, onClick: handleClick, ...props }, children)
}

/**
 * 404 fallback
 */
const NotFound: FunctionalComponent = () => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui"
      }
    },
    [
      h("h1", { style: { fontSize: "6rem", margin: 0 } }, "404"),
      h(
        "p",
        { style: { fontSize: "1.5rem", color: "#666" } },
        "Page not found"
      ),
      h(
        "a",
        {
          href: "/",
          style: {
            color: "#10b981",
            textDecoration: "none",
            fontSize: "1.2rem"
          }
        },
        "Go home"
      )
    ]
  )
}