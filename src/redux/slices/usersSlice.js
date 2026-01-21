import { createSlice } from '@reduxjs/toolkit';
import usersData from '../../data/users.json';

const initialState = {
  items: usersData.users,
  currentUser: usersData.users[0], // Default to first user (Admin)
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setCurrentUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
