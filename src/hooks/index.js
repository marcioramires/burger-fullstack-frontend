import React from "react";

import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'

const AppProvider = ({ children }) => (

    <UserProvider>
        <CartProvider>
            {children}
        </CartProvider>
    </UserProvider>
)

export default AppProvider