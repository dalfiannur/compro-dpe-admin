import React, {Suspense, useState} from 'react'
import {Provider} from "react-redux";
import {store} from "./stores";
import {MainRoutes} from "./routes/index";
import {ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider} from "@mantine/core";

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Provider store={store}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <Suspense fallback={<LoadingOverlay visible={true}/>}>
                    <MainRoutes/>
                </Suspense>
            </MantineProvider>
        </ColorSchemeProvider>
    </Provider>
  );
}

export default App;
