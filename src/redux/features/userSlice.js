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
      localStorage.setItem('loginTimestamp', Date.now());
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('loginTimestamp');
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('loginTimestamp', Date.now());
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('loginTimestamp');
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;