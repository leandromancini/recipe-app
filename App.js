import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import StatusBar from './components/StatusBar';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Home from './components/Home';
import Category from './components/Category';
import Product from './components/Product';
import Recipe from './components/Recipe';
import store from './store/Store';
import theme from './components/styles/Theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar />
          <TopBar />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Recipe" component={Recipe} />
          </Stack.Navigator>
          <BottomBar />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
