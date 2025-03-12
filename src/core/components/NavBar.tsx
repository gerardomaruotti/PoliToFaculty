import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmptyScreen } from '../../screens/EmptyScreen';
import { TeachingNavigator } from './TeachingNavigator';
import { AgendaNavigator } from './AgendaNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { ServicesScreen } from '../../screens/ServicesScreen';
import { PlacesScreen } from '../../screens/PlacesScreen';
const Tab = createBottomTabNavigator();

export const NavBar = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Teaching"
        component={TeachingNavigator}
        options={{
          tabBarLabel: 'Didattica',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={AgendaNavigator}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Places"
        component={PlacesScreen}
        options={{
          tabBarLabel: 'Luoghi',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      /> 
      <Tab.Screen
      name="Services"
      component={ServicesScreen}
      options={{
        tabBarLabel: 'Servizi',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="location" color={color} size={size} />
        ),
      }}
    />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profilo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};