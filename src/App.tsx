import React, {Suspense} from 'react'
import {Provider} from "react-redux";
import {store} from "./stores";
import {MainRoutes} from "./routes/index";
import {LoadingOverlay} from "@mantine/core";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingOverlay visible={true}/>}>
        <MainRoutes/>
      </Suspense>
    </Provider>
  );
}

export default App;
