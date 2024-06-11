import React from "react"
const TrendzContext = React.createContext({
    isAuthenticated: false,
    cartList: [],
    loginList: [],
    addCartItem: () => {},
    addAccountDetails: () => {},
    removeCartItem: () => {},
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity: () => {},
    handlelogin: () => {},
})
export default TrendzContext