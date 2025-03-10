import React from 'react';

import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
  } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import {NavBar} from './core/components/NavBar';
  import {colors} from './core/constants/colors';
  import * as themes from './core/constants/themes';
  import { AppNavigator } from './core/components/AppNavigator';


  export const App = () => {
    const colorScheme = useColorScheme();
    let theme, statusBarProps;
  
    if (colorScheme === 'dark') {
      theme = themes.DarkTheme;
      statusBarProps = {
        style: 'light',
        backgroundColor: colors.surfaceDark,
      };
    } else {
      theme = themes.LightTheme;
      statusBarProps = {
        style: 'dark',
        backgroundColor: colors.surfaceLight,
      };
    }
  
    return (
      <>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={theme}>
        <NavBar></NavBar>
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  });
  
  export default App;