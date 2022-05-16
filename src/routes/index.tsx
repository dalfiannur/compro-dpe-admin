import React from "react";
import {LoginPage, DashboardPage, BannerPage, SkinConcernPage, SkinTypePage, ProductPage, ArticlePage} from "../pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BaseLayout} from "../layouts/BaseLayout";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<BaseLayout/>}>
          <Route element={<DashboardPage/>} path="/dashboard"/>
          <Route element={<ProductPage/>} path="/product"/>
          <Route element={<BannerPage/>} path="/banner"/>
          <Route element={<SkinConcernPage/>} path="/skin-concern"/>
          <Route element={<SkinTypePage/>} path="/skin-type"/>
          <Route element={<ArticlePage />} path="/article" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
