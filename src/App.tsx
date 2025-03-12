import React, { useMemo } from 'react';

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
  import { darkTheme } from './core/themes/dark';
 import { lightTheme } from './core/themes/light';
 import { fromUiTheme } from './utils/navigation-theme';
 import { ThemeContext } from './ui/contexts/ThemeContext';

  export const App = () => {
    
    const colorScheme = useColorScheme();
    const uiTheme = colorScheme === 'light' ? lightTheme : darkTheme;
   const navigationTheme = useMemo(() => fromUiTheme(uiTheme), [uiTheme]);
  
    return (
      <>
      <ThemeContext.Provider value={uiTheme}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={navigationTheme}>
        <NavBar></NavBar>
          </NavigationContainer>
        </SafeAreaView>
        </ThemeContext.Provider>
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

function useFonts(arg0: { 'Poppins-bold': any; 'Poppins-bold-italic': any; 'Poppins-normal-italic': any; 'Poppins-normal': any; 'Poppins-semibold': any; 'Poppins-semibold-italic': any; }): [any] {
  throw new Error('Function not implemented.');
}
