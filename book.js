import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';

function HomeScreen({ navigation }) {
  const [lastBookInfo, setLastBookInfo] = useState({});

  useEffect(() => {
    loadLastBookInfo();
  }, []);

  async function loadLastBookInfo() {
    try {
      const storedBookInfo = await AsyncStorage.getItem('LAST_BOOK_INFO');

      if (storedBookInfo) {
        setLastBookInfo(JSON.parse(storedBookInfo));
      }
    } catch (e) {
      console.error('Failed to load last book info.');
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Enter Book" onPress={() => navigation.navigate('Genre')} />
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.name}>Monde Mkhize</Text>

      {/* Display the details of the last book read */}
      <Text style={styles.bookInfoText}>Last Book Info:</Text>
      <Text>Title: {lastBookInfo.Title}</Text>
      <Text>Author: {lastBookInfo.Author}</Text>
      <Text>Genre: {lastBookInfo.Genre}</Text>
      <Text>Number of Pages: {lastBookInfo.Numberofpages}</Text>
    </View>
  );
}

function GenreScreen({ navigation }) {
  const [Title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [Genre, setGenre] = useState('');
  const [Numberofpages, setNumberofpages] = useState('');

  async function saveBookInfo() {
    const bookData = {
      Title,
      Author,
      Genre,
      Numberofpages,
    };
    try {
      await AsyncStorage.setItem('LAST_BOOK_INFO', JSON.stringify(bookData));
    } catch (e) {
      console.error('Failed to save book info.');
    }
  }

  return (
    <View style={styles.containerGenre}>
      <Button title="Homepage" onPress={() => navigation.navigate('Home')} />
      <Text style={styles.enterbook}>Enter your latest Book</Text>
      <TextInput
        style={styles.TitleEntry}
        placeholder="Title"
        onChangeText={(newText) => setTitle(newText)}
      />
      <TextInput
        style={styles.TitleEntry}
        placeholder="Author"
        onChangeText={(newText) => setAuthor(newText)}
      />
      <TextInput
        style={styles.TitleEntry}
        placeholder="Genre"
        onChangeText={(newText) => setGenre(newText)}
      />
      <TextInput
        style={styles.TitleEntry}
        placeholder="Number of pages"
        onChangeText={(newText) => setNumberofpages(newText)}
      />
      <Button title="Save Book Info" onPress={saveBookInfo} />

      {/* Display the entered book details */}
      <Text style={styles.bookInfoText}>Entered Book Info:</Text>
      <Text>Title: {Title}</Text>
      <Text>Author: {Author}</Text>
      <Text>Genre: {Genre}</Text>
      <Text>Number of Pages: {Numberofpages}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  containerGenre: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 20,
  },
  enterbook: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  TitleEntry: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  bookInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Genre" component={GenreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
