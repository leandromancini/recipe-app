import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { setTitle } from '../store/reducer/Navigation';
import { useDispatch } from 'react-redux';
import { getProduct, searchProducts } from '../service/Product';
import { searchRecipes } from '../service/Recipe';
import { useRoute } from '@react-navigation/native';
import theme from './styles/Theme';

const Product = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const [product, setProduct] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const fetchData = useCallback(() => {
    const { id } = route.params as any;
    getProduct(id)
      .then((productData) => {
        console.log('Product Data:', productData);
        setProduct(productData);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });

    searchRecipes().then((recipes) => {
      console.log('Recipes:', recipes.items);
      setRecipes(recipes.items.length > 0 ? recipes.items : []);
    });
  }, [route.params]);

  useEffect(() => {
    dispatch(setTitle('Product Details'));
    fetchData();
  }, [dispatch, fetchData]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <ScrollView contentContainerStyle={styles.textContainer}>
          {product.name ? (
            <>
              <Text style={styles.cardText}>Name: {product.name}</Text>
              <Text style={styles.descriptionText}>
                Description: {product.description}
              </Text>
              <Text style={styles.priceText}>Price: {product.price}</Text>
            </>
          ) : (
            <Text style={styles.noDetailsText}>
              No product details available
            </Text>
          )}
        </ScrollView>
        {product.image && (
          <Image source={{ uri: product.image }} style={styles.productImage} />
        )}
      </View>
      <View style={styles.lowerHalf}>
        <Text style={styles.recipesTitle}>Recipes</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card]}>
              <View style={theme.contentCentered}>
                <Text style={styles.cardText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  upperHalf: {
    width: '100%',
    height: '50%', // Ocupa el 50% de la pantalla verticalmente
    padding: 20, // Padding superior de 20
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Espacio entre el texto y la imagen
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde natural
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDetailsText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 10,
  },
  lowerHalf: {
    width: '100%',
    height: '50%', // Ocupa el 50% de la pantalla verticalmente
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recipesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  listContainer: {
    paddingVertical: 20,
  },
  card: {
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
});

export default Product;
