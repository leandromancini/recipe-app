import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setTitle: (state, action) => {
      return { ...state, title: action.payload };
    },
  },
});

export const { setTitle } = navigationSlice.actions;
export default navigationSlice.reducer;

export const selectNavigationTitle = (state) => state.navigation.title;
