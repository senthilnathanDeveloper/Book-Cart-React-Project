'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import { Box } from "@mui/material";
import { useState } from "react";
import Register from "./components/Register/Register";
import { Provider } from "react-redux";
import store from "./store";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  const togglerForm = () => setIsLogin(!isLogin)
  return (
    <div>
          <Provider store={store}>
      <Box style={{ minHeight: '100', bgColor: '#f5f5f5', py: 4 }}>
        {isLogin ? (
          <>
            <Login onToggleForm={togglerForm} />
          </>
        ) : (
          <Register onToggleForm={togglerForm} />
        )}
      </Box>
      </Provider>
    </div>
  );
}
