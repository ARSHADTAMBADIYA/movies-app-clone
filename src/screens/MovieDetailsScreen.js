import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/moviesSlice';
import axios from 'axios';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'd1d575a4';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;
const MoviePoster = styled.Image`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const MovieTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const MovieInfo = styled.Text`
  color: gray;
  font-size: 16px;
  margin-bottom: 5px;
`;
const Description = styled.Text`
  color: white;
  font-size: 16px;
  line-height: 22px;
  margin-top: 10px;
`;
const Button = styled.TouchableOpacity`
  background-color: #ff4500;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 50px;
`;

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movies.favorites);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}&i=${movieId}`);
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ff4500" />;
  }

  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  return (
    <ScrollView>
      <Container>
        <MoviePoster source={{ uri: movie.Poster }} />
        <FavoriteButton onPress={() => {
          isFavorite ? dispatch(removeFavorite(movie.imdbID)) : dispatch(addFavorite(movie));
        }}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color="white" />
        </FavoriteButton>
        <MovieTitle>{movie.Title} ({movie.Year})</MovieTitle>
        <MovieInfo>🎭 Genre: {movie.Genre}</MovieInfo>
        <MovieInfo>⭐ IMDB Rating: {movie.imdbRating}</MovieInfo>
        <MovieInfo>🎬 Director: {movie.Director}</MovieInfo>
        <MovieInfo>📅 Release Year: {movie.Year}</MovieInfo>
        <Description>{movie.Plot}</Description>
        <Button onPress={() => alert('Booking Feature Coming Soon!')}>
          <ButtonText>Book Tickets</ButtonText>
        </Button>
      </Container>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
