import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;