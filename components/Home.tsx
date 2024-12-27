import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { searchCategories } from '../service/Category';
import { useFocusEffect } from '@react-navigation/native';
import theme from './styles/Theme';
import vegetableHomeImage from '../assets/images/vegetable-home.png';

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const fetchData = useCallback(() => {
    searchCategories().then((category) => {
      setCategories(category.items.length > 0 ? category.items : []);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const goToCategory = (id) => {
    navigation.navigate({
      name: 'Category',
      params: { id },
      key: id,
    });
  };

  const Category = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => goToCategory(item.id)}
        style={[styles.categoryCard, styles.contentCentered]}
      >
        <View style={theme.contentCentered}>
          <Text style={styles.categoryCardText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[theme.container, styles.container]}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Category item={item} />}
        contentContainerStyle={styles.categoryListContainer}
      />
      <Image source={vegetableHomeImage} style={styles.homeImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  categoryListContainer: {
    paddingVertical: 20,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  contentCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  homeImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 300,
    height: 300,
  },
});

export default Home;
