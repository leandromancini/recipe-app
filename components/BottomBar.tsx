import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { SimpleLineIcons } from '@expo/vector-icons';
import theme from './styles/Theme';

const BottomBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome}>
        <View style={styles.homeContainer}>
          <SimpleLineIcons name="home" style={theme.info.icon} />
          <Text style={theme.info.small}>Inicio</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: theme.colors.background,
  },
  homeContainer: {
    marginBottom: 18,
    alignItems: 'center',
  },
});

export default BottomBar;
