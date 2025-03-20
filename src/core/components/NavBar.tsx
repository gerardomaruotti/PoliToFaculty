import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmptyScreen } from '../../screens/EmptyScreen';
import { Animated, Platform, StyleProp, View, ViewStyle } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
 import { useTheme } from '../../ui/hooks/useTheme';
 import { Header } from './Header';
 import { TranslucentView } from './TranslucentView';
 import { Tab } from '../../ui/components/Tab';
 import { Tabs } from '../../ui/components/Tabs';
import { TeachingScreen } from '../../screens/Teaching/TeachingScreen';
import { TeachingNavigator } from '../../screens/Teaching/TeachingNavigator';
import { AgendaNavigator } from '../../screens/Agenda/AgendaNavigator';


const TabsNav = createBottomTabNavigator(); 


export const NavBar = () => {

  const { colors } = useTheme();
  const tabBarStyle: any = {
    position: Platform.select({ ios: 'absolute' }),
  };
  if (Platform.OS === 'ios') {
    tabBarStyle.height = 84;
  }

  return (


     <TabsNav.Navigator>
      <TabsNav.Screen
        name="Incarichi"
        component={TeachingNavigator}
        options={{
          headerShown : false,
          tabBarLabel: 'Didattica',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
          
        }}
      />
      <TabsNav.Screen
        name="Agenda"
        component={AgendaNavigator}
        options={{
          headerShown : false,
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <TabsNav.Screen
        name="Places"
        component={EmptyScreen}
        options={{
          headerShown : false,
          tabBarLabel: 'Luoghi',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      /> 
      <TabsNav.Screen
      name="Services"
      component={EmptyScreen}
      options={{
        headerShown : false,
        tabBarLabel: 'Servizi',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="location" color={color} size={size} />
        ),
      }}
    />
      <TabsNav.Screen
        name="Profile"
        component={EmptyScreen}
        options={{
          headerShown : false,
          tabBarLabel: 'Profilo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </TabsNav.Navigator>
  );
};




export type TabsNavigatorParamList = {
  Teaching: undefined;
};