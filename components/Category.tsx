import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getCategory } from '../service/Category';
import { useDispatch } from 'react-redux';
import { setTitle } from '../store/reducer/Navigation';
import { searchProducts } from '../service/Product';
import theme from './styles/Theme';

const Category = ({ navigation }) => {
  const dispatch = useDispatch();

  const route = useRoute();

  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(() => {
    const { id } = route.params as any;
    if (id) {
      getCategory(id).then((category) => {
        dispatch(setTitle(category.name));

        setSubcategories(category.subcategories ? category.subcategories : []);
      });

      searchProducts(id).then((products) =>
        setProducts(products.items.length > 0 ? products.items : []),
      );
    }
  }, [route, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const goToRecipe = () => {
    const { id } = route.params as any;
    navigation.navigate({
      name: 'Recipe',
      params: { categoryId: id },
      key: `${id}/recipe`,
    });
  };

  const Subcategory = ({ item }) => {
    const goToCategory = () => {
      navigation.navigate({
        name: 'Category',
        params: { id: item.id },
        key: item.id,
      });
    };

    return (
      <TouchableOpacity onPress={goToCategory}>
        <View
          style={[theme.card, theme.contentCentered, styles.subcategoryCard]}
        >
          <Text style={[theme.text.small, styles.subcategoryTitle]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Subcategories = () => {
    return (
      <FlatList
        data={subcategories}
        renderItem={Subcategory}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={theme.rowSeparatorHorizontal} />
        )}
      />
    );
  };

  const Product = ({ item }) => {
    const goToProduct = () => {
      navigation.navigate({
        name: 'Product',
        params: { id: item.id },
        key: item.id,
      });
    };

    return (
      <TouchableOpacity onPress={goToProduct}>
        <View style={[theme.card, styles.productCard]}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={[theme.container, theme.contentCentered]}>
            <Text style={[theme.text.small, theme.text.card]}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Products = () => {
    return (
      <FlatList
        data={products}
        renderItem={({ item }) => <Product item={item} />}
        pagingEnabled
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={theme.columnSeparator}
        ItemSeparatorComponent={() => (
          <View style={theme.rowSeparatorVertical} />
        )}
      />
    );
  };

  const RecipeButton = () => {
    return (
      <TouchableOpacity onPress={goToRecipe}>
        <View style={styles.recipeButtonContainer}>
          <View style={[theme.button.small, theme.contentCentered]}>
            <Text style={[theme.button.smallText]}>VER RECETAS</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[theme.container, theme.screenContainer]}>
      {subcategories.length > 0 && (
        <View
          style={[
            theme.container,
            theme.contentCentered,
            styles.container,
            styles.subcategoryContainer,
          ]}
        >
          <Subcategories />
        </View>
      )}
      {products.length > 0 ? (
        <View style={[theme.container, styles.container]}>
          <Text style={theme.section}>Productos</Text>
          <Products />
          <RecipeButton />
        </View>
      ) : (
        <View style={[theme.container, theme.contentCentered]}>
          <Text style={theme.placeholder.regular}>
            No se encontraron productos
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  subcategoryContainer: {
    maxHeight: 50,
    marginBottom: 10,
  },
  subcategoryCard: {
    width: 150,
    height: 50,
  },
  subcategoryTitle: {
    textAlign: 'center',
  },
  productCard: {
    height: 240,
    width: 200,
  },
  productImage: {
    height: 195,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  recipeButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 5,
    alignItems: 'center',
  },
});

export default Category;
