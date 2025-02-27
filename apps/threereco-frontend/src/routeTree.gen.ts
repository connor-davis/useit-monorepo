/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OnboardingImport } from './routes/_onboarding'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthenticationRegisterImport } from './routes/authentication/register'
import { Route as AuthenticationLoginImport } from './routes/authentication/login'
import { Route as OnboardingSetupImport } from './routes/_onboarding/setup'
import { Route as AuthUsersIndexImport } from './routes/_auth/users/index'
import { Route as AuthMaterialsIndexImport } from './routes/_auth/materials/index'
import { Route as AuthMaterialsCreateImport } from './routes/_auth/materials/create'
import { Route as AuthMaterialsIdImport } from './routes/_auth/materials/$id'
import { Route as AuthMaterialsEditIdImport } from './routes/_auth/materials/edit/$id'

// Create/Update Routes

const OnboardingRoute = OnboardingImport.update({
  id: '/_onboarding',
  getParentRoute: () => rootRoute,
} as any)

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

const OnboardingSetupRoute = OnboardingSetupImport.update({
  id: '/setup',
  path: '/setup',
  getParentRoute: () => OnboardingRoute,
} as any)

const AuthUsersIndexRoute = AuthUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMaterialsIndexRoute = AuthMaterialsIndexImport.update({
  id: '/materials/',
  path: '/materials/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMaterialsCreateRoute = AuthMaterialsCreateImport.update({
  id: '/materials/create',
  path: '/materials/create',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMaterialsIdRoute = AuthMaterialsIdImport.update({
  id: '/materials/$id',
  path: '/materials/$id',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMaterialsEditIdRoute = AuthMaterialsEditIdImport.update({
  id: '/materials/edit/$id',
  path: '/materials/edit/$id',
  getParentRoute: () => AuthRoute,
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
    '/_onboarding': {
      id: '/_onboarding'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof OnboardingImport
      parentRoute: typeof rootRoute
    }
    '/_onboarding/setup': {
      id: '/_onboarding/setup'
      path: '/setup'
      fullPath: '/setup'
      preLoaderRoute: typeof OnboardingSetupImport
      parentRoute: typeof OnboardingImport
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
    '/_auth/materials/$id': {
      id: '/_auth/materials/$id'
      path: '/materials/$id'
      fullPath: '/materials/$id'
      preLoaderRoute: typeof AuthMaterialsIdImport
      parentRoute: typeof AuthImport
    }
    '/_auth/materials/create': {
      id: '/_auth/materials/create'
      path: '/materials/create'
      fullPath: '/materials/create'
      preLoaderRoute: typeof AuthMaterialsCreateImport
      parentRoute: typeof AuthImport
    }
    '/_auth/materials/': {
      id: '/_auth/materials/'
      path: '/materials'
      fullPath: '/materials'
      preLoaderRoute: typeof AuthMaterialsIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users/': {
      id: '/_auth/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthUsersIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/materials/edit/$id': {
      id: '/_auth/materials/edit/$id'
      path: '/materials/edit/$id'
      fullPath: '/materials/edit/$id'
      preLoaderRoute: typeof AuthMaterialsEditIdImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthIndexRoute: typeof AuthIndexRoute
  AuthMaterialsIdRoute: typeof AuthMaterialsIdRoute
  AuthMaterialsCreateRoute: typeof AuthMaterialsCreateRoute
  AuthMaterialsIndexRoute: typeof AuthMaterialsIndexRoute
  AuthUsersIndexRoute: typeof AuthUsersIndexRoute
  AuthMaterialsEditIdRoute: typeof AuthMaterialsEditIdRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthIndexRoute: AuthIndexRoute,
  AuthMaterialsIdRoute: AuthMaterialsIdRoute,
  AuthMaterialsCreateRoute: AuthMaterialsCreateRoute,
  AuthMaterialsIndexRoute: AuthMaterialsIndexRoute,
  AuthUsersIndexRoute: AuthUsersIndexRoute,
  AuthMaterialsEditIdRoute: AuthMaterialsEditIdRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface OnboardingRouteChildren {
  OnboardingSetupRoute: typeof OnboardingSetupRoute
}

const OnboardingRouteChildren: OnboardingRouteChildren = {
  OnboardingSetupRoute: OnboardingSetupRoute,
}

const OnboardingRouteWithChildren = OnboardingRoute._addFileChildren(
  OnboardingRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof OnboardingRouteWithChildren
  '/setup': typeof OnboardingSetupRoute
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/': typeof AuthIndexRoute
  '/materials/$id': typeof AuthMaterialsIdRoute
  '/materials/create': typeof AuthMaterialsCreateRoute
  '/materials': typeof AuthMaterialsIndexRoute
  '/users': typeof AuthUsersIndexRoute
  '/materials/edit/$id': typeof AuthMaterialsEditIdRoute
}

export interface FileRoutesByTo {
  '': typeof OnboardingRouteWithChildren
  '/setup': typeof OnboardingSetupRoute
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/': typeof AuthIndexRoute
  '/materials/$id': typeof AuthMaterialsIdRoute
  '/materials/create': typeof AuthMaterialsCreateRoute
  '/materials': typeof AuthMaterialsIndexRoute
  '/users': typeof AuthUsersIndexRoute
  '/materials/edit/$id': typeof AuthMaterialsEditIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_onboarding': typeof OnboardingRouteWithChildren
  '/_onboarding/setup': typeof OnboardingSetupRoute
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/_auth/': typeof AuthIndexRoute
  '/_auth/materials/$id': typeof AuthMaterialsIdRoute
  '/_auth/materials/create': typeof AuthMaterialsCreateRoute
  '/_auth/materials/': typeof AuthMaterialsIndexRoute
  '/_auth/users/': typeof AuthUsersIndexRoute
  '/_auth/materials/edit/$id': typeof AuthMaterialsEditIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/setup'
    | '/authentication/login'
    | '/authentication/register'
    | '/'
    | '/materials/$id'
    | '/materials/create'
    | '/materials'
    | '/users'
    | '/materials/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/setup'
    | '/authentication/login'
    | '/authentication/register'
    | '/'
    | '/materials/$id'
    | '/materials/create'
    | '/materials'
    | '/users'
    | '/materials/edit/$id'
  id:
    | '__root__'
    | '/_auth'
    | '/_onboarding'
    | '/_onboarding/setup'
    | '/authentication/login'
    | '/authentication/register'
    | '/_auth/'
    | '/_auth/materials/$id'
    | '/_auth/materials/create'
    | '/_auth/materials/'
    | '/_auth/users/'
    | '/_auth/materials/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  OnboardingRoute: typeof OnboardingRouteWithChildren
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationRegisterRoute: typeof AuthenticationRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  OnboardingRoute: OnboardingRouteWithChildren,
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
        "/_onboarding",
        "/authentication/login",
        "/authentication/register"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/",
        "/_auth/materials/$id",
        "/_auth/materials/create",
        "/_auth/materials/",
        "/_auth/users/",
        "/_auth/materials/edit/$id"
      ]
    },
    "/_onboarding": {
      "filePath": "_onboarding.tsx",
      "children": [
        "/_onboarding/setup"
      ]
    },
    "/_onboarding/setup": {
      "filePath": "_onboarding/setup.tsx",
      "parent": "/_onboarding"
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
    },
    "/_auth/materials/$id": {
      "filePath": "_auth/materials/$id.tsx",
      "parent": "/_auth"
    },
    "/_auth/materials/create": {
      "filePath": "_auth/materials/create.tsx",
      "parent": "/_auth"
    },
    "/_auth/materials/": {
      "filePath": "_auth/materials/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/users/": {
      "filePath": "_auth/users/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/materials/edit/$id": {
      "filePath": "_auth/materials/edit/$id.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
