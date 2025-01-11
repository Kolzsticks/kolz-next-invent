// routes.ts

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * Using "/**" to make all routes public except auth routes
 * @type {string[]}
 */
export const publicRoutes = [
    "/**", // This makes all routes public by default
    "/*",  // Catch root level routes too
  ]
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /dashboard
   * @type {string[]}
   */
  export const authRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
  ]
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  export const apiAuthPrefix = "/api/auth"
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard"