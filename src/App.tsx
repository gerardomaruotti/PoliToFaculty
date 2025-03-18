import React, { useMemo } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavBar } from './core/components/NavBar';
import { darkTheme } from './core/themes/dark';
import { lightTheme } from './core/themes/light';
import { fromUiTheme } from './utils/navigation-theme';
import { ThemeContext } from './ui/contexts/ThemeContext';
import { CoursesProvider } from './core/contexts/CoursesContext';
export const App = () => {
  const colorScheme = useColorScheme();
  const uiTheme = colorScheme === 'light' ? lightTheme : darkTheme;
  const navigationTheme = useMemo(() => fromUiTheme(uiTheme), [uiTheme]);

  return (
    <CoursesProvider>  {/* Avvolgi l'intera app con CoursesProvider */}
      <ThemeContext.Provider value={uiTheme}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={navigationTheme}>
            <NavBar />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeContext.Provider>
    </CoursesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
