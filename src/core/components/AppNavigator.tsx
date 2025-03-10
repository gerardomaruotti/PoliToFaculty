import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../screens/HomeScreen';
import { EmptyScreen } from '../../screens/EmptyScreen';
import { TeachingNavigator } from './TeachingNavigator'; // Importiamo il TeachingNavigator
import { NavBar } from './NavBar';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={EmptyScreen} />
        <Stack.Screen name="Courses" component={EmptyScreen} />
        <Stack.Screen name="Exams" component={EmptyScreen} />
        <Stack.Screen name="Grades" component={EmptyScreen} />
        <Stack.Screen name="Teaching" component={TeachingNavigator} options={{ title: 'Didattica' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
