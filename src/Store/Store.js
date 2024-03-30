import { configureStore } from "@reduxjs/toolkit";
import  authSliceDetails  from "../Api/authSlice";


export const Store = configureStore({
    reducer: {
        AuthData: authSliceDetails,
    }
})

