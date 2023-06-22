import React from "react";
import {LoginPage, DashboardPage, BannerPage, SkinConcernPage, SkinTypePage, ProductSeries, ProductCategories, ArticlePage, UserPage} from "../pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BaseLayout} from "../layouts/BaseLayout";
import TypeCategories from "../pages/TypeList/Categories";
import TypeSeries from "../pages/TypeList/Series"

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/" element={<BaseLayout/>}>
          {/* <Route element={<DashboardPage/>} path="/dashboard"/> */}
          <Route element={<ProductSeries/>} path="/series"/>
          <Route element={<ProductCategories/>} path="/categories"/>
          <Route element={<BannerPage/>} path="/banner"/>
          <Route element={<SkinConcernPage/>} path="/skin-concern"/>
          <Route element={<SkinTypePage/>} path="/skin-type"/>
          <Route element={<ArticlePage />} path="/article" />
          <Route element={<UserPage />} path="/user" />
          <Route element={<TypeCategories />} path="/type/categories" />
          <Route element={<TypeSeries />} path="/type/series" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
