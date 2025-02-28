import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/moviesSlice';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

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
const RemoveButton = styled.TouchableOpacity`
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

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector(state => state.movies.favorites);
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>
        <Title>❤️ Favorite Movies</Title>
      </Header>
      {favorites.length === 0 ? (
        <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 20 }}>No favorite movies added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard onPress={() => navigation.navigate('Details', { movieId: item.imdbID })}>
              <MovieImage source={{ uri: item.Poster }} />
              <MovieDetails>
                <MovieTitle>{item.Title}</MovieTitle>
                <MovieYear>{item.Year}</MovieYear>
                <RemoveButton onPress={() => dispatch(removeFavorite(item.imdbID))}>
                  <ButtonText>Remove</ButtonText>
                </RemoveButton>
              </MovieDetails>
            </MovieCard>
          )}
        />
      )}
    </Container>
  );
};

export default FavoritesScreen;