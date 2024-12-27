import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { searchRecipes } from '../service/Recipe';
import { SimpleLineIcons, Octicons } from '@expo/vector-icons';
import theme from './styles/Theme';

const Recipe = () => {
  const route = useRoute();

  const [recipes, setRecipes] = useState([]);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  const fetchData = useCallback(() => {
    const { categoryId, productId } = route.params as any;
    if (categoryId || productId) {
      searchRecipes({ categoryId, productId }).then((recipes) =>
        setRecipes(recipes.items.length > 0 ? recipes.items : []),
      );
    }
  }, [route]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const goToVideo = (recipeLink) => {
    Linking.openURL(recipeLink);
  };

  const Recipe = ({ item }) => {
    const isExpanded = expandedRecipeId === item.id;

    const expand = () => {
      setExpandedRecipeId(!isExpanded ? item.id : null);
    };

    const Header = () => {
      return (
        <View style={styles.recipeHeaderContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={expand}
            style={styles.recipeTitleContainer}
          >
            <Text style={[theme.text.regular, styles.recipeTitle]}>
              {item.name}
            </Text>
            <SimpleLineIcons
              name={isExpanded ? 'arrow-up' : 'arrow-down'}
              style={theme.text.icon}
            />
          </TouchableOpacity>
          {item.link && (
            <TouchableOpacity onPress={() => goToVideo(item.link)}>
              <Octicons name="video" style={theme.link.icon} />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View style={theme.container}>
        <Header />
        {isExpanded && (
          <View>
            {item.ingredients?.length && (
              <View>
                <Text style={[theme.text.small, styles.recipeSubtitle]}>
                  Ingredientes
                </Text>
                {item.ingredients?.map((ingredient) => (
                  <Text
                    key={ingredient}
                    style={[theme.text.small, styles.recipeContent]}
                  >
                    • {ingredient}
                  </Text>
                ))}
              </View>
            )}
            <Text style={[theme.text.small, styles.recipeSubtitle]}>
              Instrucciones
            </Text>
            <Text style={[theme.text.small, styles.recipeContent]}>
              {item.instructions}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const Recipes = () => {
    return (
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Recipe item={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[theme.rowSeparatorVertical, theme.lineSeparator]} />
        )}
      />
    );
  };

  return (
    <View style={[theme.container, theme.screenContainer]}>
      {recipes.length > 0 ? (
        <View style={theme.container}>
          <Text style={theme.section}>Recetas</Text>
          <Recipes />
        </View>
      ) : (
        <View style={[theme.container, theme.contentCentered]}>
          <Text style={theme.placeholder.regular}>
            No se encontraron recetas
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recipeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeTitleContainer: {
    flexDirection: 'row',
  },
  recipeTitle: {
    marginRight: 8,
  },
  recipeSubtitle: {
    fontWeight: 700,
    paddingLeft: 10,
    marginVertical: 5,
  },
  recipeContent: {
    paddingLeft: 20,
  },
});

export default Recipe;
