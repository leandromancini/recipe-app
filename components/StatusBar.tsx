import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import theme from './styles/Theme';

const StatusBar = () => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        height: Constants.statusBarHeight,
      }}
    />
  );
};

export default StatusBar;
