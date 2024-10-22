/* eslint-disable no-console */
import type { MiddlewareHandler } from 'astro'

type Path = string
interface ICachedResponse {
  response: Response
  expires: number
}

const cache = new Map<Path, ICachedResponse>()

export const onRequest: MiddlewareHandler = async (req, next) => {
  console.log('[Middleware] onRequest', req.url.pathname)
  let ttl: number | undefined
  // Add a `cache` method to the `req.locals` object
  // that will allow us to set the cache duration for each page.
  req.locals.cache = (seconds: number) => {
    ttl = seconds
  }

  if (import.meta.env.DEV) {
    return next()
  }

  const cached = cache.get(req.url.pathname)

  if (cached && cached.expires > Date.now()) {
    console.log('[Middleware] Cache hit:', req.url.pathname)
    return cached.response.clone()
  } else if (cached) {
    console.log('[Middleware] Cache expired:', req.url.pathname)
    cache.delete(req.url.pathname)
  }

  if (!cached && ttl !== undefined) {
    console.log('[Middleware] Cache miss:', req.url.pathname)
  }

  const response = await next()

  // If the `cache` method was called, store the response in the cache.
  if (ttl !== undefined) {
    cache.set(req.url.pathname, {
      response: response.clone(),
      expires: Date.now() + ttl * 1000,
    })
  }

  return response
}
