'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import { Box } from "@mui/material";
import { useState } from "react";
import Register from "./components/Register/Register";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  const togglerForm = () => setIsLogin(!isLogin)
  return (
    <div>
      <Box style={{ minHeight: '100', bgColor: '#f5f5f5', py: 4 }}>
        {isLogin ? (
          <>
            <Login onToggleForm={togglerForm} />
          </>
        ) : (
          <Register onToggleForm={togglerForm} />
        )}
      </Box>

    </div>
  );
}
