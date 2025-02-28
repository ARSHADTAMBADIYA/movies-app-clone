import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadFavorites = createAsyncThunk('movies/loadFavorites', async () => {
  const favorites = await AsyncStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: { favorites: [] },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  }
});

export const { addFavorite, removeFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;