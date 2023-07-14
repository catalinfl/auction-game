import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register/Register.tsx'
import Login from './pages/Login/Login.tsx'
import { Provider } from "react-redux";
import store, { persistor } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import Auctions from './pages/Auctions/Auctions.tsx'
import Containers from './pages/Containers/Containers.tsx'
import { BaseProvider, createTheme, darkThemePrimitives } from 'baseui'

const engine = new Styletron();

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/auctions', element: <Auctions /> },
    { path: '/containers', element: <Containers />}
  ])

const theme = createTheme(darkThemePrimitives)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}> 
        <PersistGate persistor={persistor}> 
          <StyletronProvider value={engine}> 
          <BaseProvider theme={theme}> 
            <RouterProvider router={router} />
          </BaseProvider>
          </StyletronProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
)
