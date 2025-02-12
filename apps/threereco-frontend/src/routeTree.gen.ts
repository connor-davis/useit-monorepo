/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthenticationRegisterImport } from './routes/authentication/register'
import { Route as AuthenticationLoginImport } from './routes/authentication/login'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthenticationRegisterRoute = AuthenticationRegisterImport.update({
  id: '/authentication/register',
  path: '/authentication/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  id: '/authentication/login',
  path: '/authentication/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/authentication/login': {
      id: '/authentication/login'
      path: '/authentication/login'
      fullPath: '/authentication/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof rootRoute
    }
    '/authentication/register': {
      id: '/authentication/register'
      path: '/authentication/register'
      fullPath: '/authentication/register'
      preLoaderRoute: typeof AuthenticationRegisterImport
      parentRoute: typeof rootRoute
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthIndexRoute: AuthIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/': typeof AuthIndexRoute
}

export interface FileRoutesByTo {
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/': typeof AuthIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/_auth/': typeof AuthIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/authentication/login' | '/authentication/register' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/authentication/login' | '/authentication/register' | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/authentication/login'
    | '/authentication/register'
    | '/_auth/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationRegisterRoute: typeof AuthenticationRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  AuthenticationLoginRoute: AuthenticationLoginRoute,
  AuthenticationRegisterRoute: AuthenticationRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/authentication/login",
        "/authentication/register"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/"
      ]
    },
    "/authentication/login": {
      "filePath": "authentication/login.tsx"
    },
    "/authentication/register": {
      "filePath": "authentication/register.tsx"
    },
    "/_auth/": {
      "filePath": "_auth/index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
