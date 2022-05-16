import { lazy } from 'react'

export const LoginPage = lazy(() => import('./Login'));
export const DashboardPage = lazy(() => import('./Dashboard'));
export const BannerPage = lazy(() => import('./MainBanner'));
export const SkinConcernPage = lazy(() => import('./SkinConcern'));
export const SkinTypePage = lazy(() => import('./SkinType'));
export const ProductPage = lazy(() => import('./Product'));
export const ArticlePage = lazy(() => import('./Article'));
