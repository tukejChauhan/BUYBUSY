import {}    from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SignIn from "./components/Sign-In/SingIn";
import SignUp from "./components/Sing-Up/SignUp";
import Logout from "./components/Logout/Logout";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders"
import {createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";



// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





function App() {
  
  const BrowerRouter = createBrowserRouter([
    {path: "/", element:<Navbar />, children:[
      {index: true, element: <Home />},
      {path: "/SignIn", element: <SignIn />, children:[
        {path: "", element: <Home />}
      ]},
      {path: "/SignUp", element: <SignUp /> , children:[
        {path: "", element: <Home />}
      ]},
      {path: "/Logout", element:<Logout/>},
      {path: "/Cart", element: <Cart/>},
      {path: "/Orders", element: <Orders/>},
    ]}
  ])

      

  return (
    <>
      <ToastContainer />
      <div className="App">

        {/* <CustomUserContext>
          <CustomProductContext>
            <RouterProvider router={BrowerRouter} />
          </CustomProductContext>
        </CustomUserContext> */}
                 <Provider store={store}>
          <RouterProvider router = {BrowerRouter} />
        </Provider> 
      </div>
    </>
  );
}

export default App;
