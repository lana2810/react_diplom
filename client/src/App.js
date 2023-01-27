import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "component/Header";
import Banner from "component/Banner";
import About from "component/pages/About";
import Catalog from "component/pages/Catalog";
import Contacts from "component/pages/Contacts";
import Main from "component/pages/Main";
import Product from "component/pages/Product";
import Footer from "component/footer/Footer";
import NotFound from "component/pages/NotFound";
import Cart from "component/Cart";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <main className="container">
        <Routes>
          <Route index element={<Main />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
