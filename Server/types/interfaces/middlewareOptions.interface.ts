import { CorsOptions } from 'cors';

interface ICookieParserOptions {
  secret?: string | string[]
}

interface IRateLimitOptions {
  max: number,
  windowMs?: number,
  message?: string
}

interface IMiddlewareOptions {
  corsOptions?: CorsOptions,
  cookieParserOptions?: ICookieParserOptions,
  rateLimitOptions?: IRateLimitOptions
}

export default IMiddlewareOptions;