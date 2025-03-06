import { createSlice, configureStore } from "@reduxjs/toolkit";

//This is a function can be multiple in a progrm
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: "", isLoggedIn: false },
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn=false;
        }
    },
})

const AuthReducer=authSlice.reducer;
const authActions = authSlice.actions;

const store = configureStore({
    reducer:{
        auth:AuthReducer,
    },
})

export { authActions, store }