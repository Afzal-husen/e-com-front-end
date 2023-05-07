import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const slice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    login_register_loadUser_Start: (state) => {
      state.loading = true
    },
    login_register_loadUser_success: (state, actions) => {
      state.loading = false
      state.isAuthenticated = true
      state.userData = actions.payload
      state.error = null
    },
    login_register_failure: (state, actions) => {
      return {
        ...initialState,
        error: actions.payload
      }
    },
    logout_user: (state) => {
      return initialState
    }
  },
});

export const { login_register_loadUser_Start,
   login_register_loadUser_success,
   login_register_failure,
   logout_user
   } = slice.actions;
export default slice.reducer;
