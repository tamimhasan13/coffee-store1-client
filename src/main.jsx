import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayouts from './layouts/MainLayout.jsx'
import Home from './components/Home';
import AddCoffee from './components/AddCoffee';
import UpdateCoffee from './components/UpdateCoffee';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SingIn from './components/SingIn.jsx';
import SingUp from './components/SingUp.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Users from './components/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children:[
      {
        index: true,
        loader: ()=> fetch('http://localhost:3000/coffees'),
        Component: Home,
      },
      {
        path: 'coffeeDetails/:id',
        Component: CoffeeDetails,
      },
      {
        path:'addCoffee',
        Component: AddCoffee,
      },
      {
        path: 'updateCoffee/:id',
        loader: ({params}) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: UpdateCoffee
      },
      {
        path:'signIn',
        Component: SingIn
      },
      {
        path:'singUp',
        Component: SingUp
      },
      {
        path: 'users',
        loader: ()=> fetch('http://localhost:3000/users'),
        Component: Users
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
