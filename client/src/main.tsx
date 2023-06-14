import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register/Register.tsx'
import Login from './pages/Login/Login.tsx'


const engine = new Styletron();

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
  ])




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <StyletronProvider value={engine}> 
        <RouterProvider router={router} />
      </StyletronProvider>
    </React.StrictMode>
)
