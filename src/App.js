import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import ProductDetailView from "./components/productDetailView/ProductDetailView";
import Cart from "./components/cart/Cart";
import TrendzContext from "./context/TrendzContext";
import Checkout from "./components/checkout/CheckoutView";
import CreateAccount from "./components/createAccount/CreateAccount";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const getLocalStorageData = (key) => {
  const localStorageData = localStorage.getItem(key);
  return localStorageData ? JSON.parse(localStorageData) : [];
};
function App() {
  const [cartList, setCartList] = useState(getLocalStorageData("cartData"));
  const [loginList, setLoginList] = useState(getLocalStorageData("loginData"));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(loginList));
  }, [loginList]);

  const addCartItem = (product) => {
    setCartList((prevCartList) => {
      const exisitingItem = prevCartList.find((item) => item.id === product.id);

      if (exisitingItem) {
        return prevCartList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartList, { ...product, quantity: 1 }];
      }
    });
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartList((prevCartList) => {
      const updatedCartList = prevCartList.filter((item) => item.id !== id);
      return updatedCartList;
    });
  };

  const addAccountDetails = (details) => {
    setLoginList([...loginList, details]);
    console.log(loginList);
  };

  return (
    <TrendzContext.Provider
      value={{
        cartList,
        loginList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        addAccountDetails,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProductDetailView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/check"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </TrendzContext.Provider>
  );
}

export default App;
