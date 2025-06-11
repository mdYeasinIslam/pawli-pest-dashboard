import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: null | string
    email: null | string
    
}

const initialState: AuthState = {
    token: null,
    email:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;   
        },
        logout: (state) => {
            state.token = null
            state.email = null
        }
    }
})

export const { setToken,setEmail, logout } = authSlice.actions;
export default authSlice;
