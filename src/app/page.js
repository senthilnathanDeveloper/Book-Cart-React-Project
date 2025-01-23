// src/app/page.js
'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function Home() {
  return (
<>
    <Provider store={store}>
      <Header />
      <ProductList />
 
    </Provider>
</>
  );
}
