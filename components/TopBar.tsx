import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNavigationTitle } from '../store/reducer/Navigation';
import theme from './styles/Theme';

const TopBar = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  const navigationTitle = useSelector(selectNavigationTitle);

  const Page = () => {
    const goToBack = () => {
      navigation.goBack();
    };

    return (
      <View style={[theme.container, styles.pageContainer]}>
        <TouchableOpacity onPress={goToBack}>
          <SimpleLineIcons
            name="arrow-left"
            style={[theme.info.icon, styles.pageBackIcon]}
          />
        </TouchableOpacity>
        <Text style={[theme.info.big, styles.pageTitle]}>
          {navigationTitle}
        </Text>
        <View style={styles.pageOptionIcon} />
      </View>
    );
  };

  const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (text: string) => {
      setSearch(text);
    };

    return (
      <View style={[theme.container, styles.searchBarContainer]}>
        <Feather
          name="search"
          style={[theme.placeholder.icon, styles.searchIcon]}
        />
        <TextInput
          style={[theme.placeholder.regular, styles.searchBar]}
          placeholder=""
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
    );
  };

  const Home = () => {
    return (
      <View style={styles.homeContainer}>
        <SearchBar />
      </View>
    );
  };

  switch (navigationState?.routes[navigationState.index].name) {
    case 'Category':
    case 'Product':
    case 'Recipe':
      return <Page />;
    default:
      return <Home />;
  }
};

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    maxHeight: 50,
  },
  pageBackIcon: {
    marginLeft: 12,
  },
  pageTitle: {
    flex: 1,
    textAlign: 'center',
  },
  pageOptionIcon: {
    width: 24,
    marginRight: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
  },
  searchBar: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  searchIcon: {
    paddingLeft: 8,
    marginRight: 5,
  },
  homeContainer: {
    backgroundColor: theme.colors.background,
    height: 50,
  },
});

export default TopBar;
