import {Suspense} from 'react'
import {Provider} from "react-redux";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {store} from "./stores";
import {LoginPage, DashboardPage, BannerPage, SkinConcernPage, SkinTypePage, ProductPage} from "./pages";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>OKE</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/main-banner" element={<BannerPage/>}/>
            <Route path={"/skin-concern"} element={<SkinConcernPage/>}/>
            <Route path={"/skin-type"} element={<SkinTypePage/>}/>
            <Route path={"/product"} element={<ProductPage/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
