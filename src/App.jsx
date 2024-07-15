import React, { useEffect } from 'react'
import "./App.css"
import Login from './page/login'
import Button from './component/button'
// import { Button } from 'antd'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './component/header'
import Layout from './component/layout'
import Home from './page/home'
import Footer from './component/footer'
import Dropdown from './component/dropdown'
import Menu from './component/menu'
import Detail from './page/event_detail'
import Buying_Ticket from './page/buying_ticket'
import Payment from './page/payment'
import EventManagement from './page/event-management'
import Carousel from './component/carousel'
import StepNavigation from './component/step-navigation'
import CreateEvent from './page/create-event'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/features/userSlice'
import useAutoLogout from './component/autoLogout'
import Ticket_Detail from './page/ticket-detail'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux store

  useEffect(() => {
    // Khôi phục trạng thái đăng nhập từ Local Storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData)); // Cập nhật Redux store với thông tin từ Local Storage
    }
  }, [dispatch]);
  useAutoLogout();
  const router = createBrowserRouter([
    {
      path: "/", // Thêm path mới
      element:
        <Layout showRight={true} backgroundColor="transparent" position='fixed' />, // Thiết lập showRight=true cho layout mới
      children: [{
        path: "/",
        element: <Home />,// Component cho route này
      }
      ],
    }, {
      path: "/test",
      element: <CreateEvent />
    },
    {
      path: "/",
      element:
        <Layout showRight={false} backgroundColor="transparent" position='fixed' />,
      children: [{
        path: "/login",
        element: <Login title="Login" />,
      },
      {
        path: "/sign_up",
        element: <Login title="Signup" />,
      }
      ],
    },
    {
      path: "/",
      element: <Layout showRight={true} backgroundColor="linear-gradient(90deg, rgba(48,19,78,1) 72%, rgba(112,45,180,1) 100%)" />,
      children: [
        {
          path: "/detail/:id",
          element: <Detail role='customer' />,
        }, {
          path: "/buying-ticket/:id",
          element: <Buying_Ticket />,
        },
        {
          path: "/payment/:id",
          element: <Payment />,
        },
        {
          path: "/event-management",
          element: <EventManagement />,
        },
        {
          path: "/create-event",
          element: <CreateEvent />,
        }, {
          path: "/ticket/:id",
          element: <Ticket_Detail />,
        }

      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App
