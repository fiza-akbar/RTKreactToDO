import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./slices/listSlice";

const store = configureStore({
    reducer:{
        listSlice,
    }
}) 

export default store;