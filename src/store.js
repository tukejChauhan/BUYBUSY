
import { productReducer } from "./redux/reducers/productsReducer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        productReducer
    }   
});
