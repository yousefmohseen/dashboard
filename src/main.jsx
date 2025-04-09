import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './pages/Auth.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root.jsx'
import Products from './pages/Products.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'

const routes = createBrowserRouter([
  {
    path:"/dashboard",
    element: <Auth /> , 
    children:[
      {
        path:"",
        element: <SignIn />
      },
      {
        path:"signup",
        element: <SignUp />
      }
    ]
  },
  {
    path:"/dashboard/products",
    element: <Root /> , 
    children:[
      {
        path:"",
        element: <Products />
      },
      {
        path:"add",
        element: <AddProduct />
      },
      {
        path:"edit/:id",
        element: <EditProduct />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)
