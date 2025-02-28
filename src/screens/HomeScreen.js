import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'd1d575a4';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;
const SearchInput = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const MovieCard = styled.TouchableOpacity`
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  margin-right: 15px;
`;
const MovieDetails = styled.View`
  flex: 1;
`;
const MovieTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
const MovieYear = styled.Text`
  color: gray;
  font-size: 14px;
  margin-top: 5px;
`;
const Button = styled.TouchableOpacity`
  background-color: #ff4500;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('batman');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}&s=${search}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Header>
        <Title>🎬 Movie Finder</Title>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="heart" size={28} color="white" />
        </TouchableOpacity>
      </Header>
      <SearchInput placeholder="Search Movies..." value={search} onChangeText={setSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#ff4500" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard onPress={() => navigation.navigate('Details', { movieId: item.imdbID })}>
              <MovieImage source={{ uri: item.Poster }} />
              <MovieDetails>
                <MovieTitle>{item.Title}</MovieTitle>
                <MovieYear>{item.Year}</MovieYear>
                <Button onPress={() => navigation.navigate('Details', { movieId: item.imdbID })}>
                  <ButtonText>View Details</ButtonText>
                </Button>
              </MovieDetails>
            </MovieCard>
          )}
        />
      )}
    </Container>
  );
};

export default HomeScreen;