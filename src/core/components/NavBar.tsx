import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmptyScreen } from '../../screens/EmptyScreen';
import { Animated, Platform, StyleProp, View, ViewStyle } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
 import { useTheme } from '../../ui/hooks/useTheme';
 import { Header } from './Header';
 import { TranslucentView } from './TranslucentView';
 

 import AnimatedValue = Animated.AnimatedValue;
import { TeachingScreen } from '../../screens/TeachingScreen';
 const Tabs = createBottomTabNavigator();
 const scrollTop = new Animated.Value(0);


export const NavBar = () => {

  const { colors } = useTheme();

  return (


    <Tabs.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarStyle: Platform.select({ ios: { position: 'absolute' } }),
        tabBarBackground: Platform.select({
          ios: () => <TranslucentView />,
        }),
        header: ({ options, route }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header {...options} title={title} scrollTop={scrollTop} />;
        },
        headerTransparent: true,
        headerBackground: Platform.select({
          ios: () => <TranslucentView />,
          android: (props: { style: Animated.WithAnimatedValue<StyleProp<ViewStyle>> }) => {
            // Assicurati che il tipo di `style` sia correttamente gestito come stile valido
            const animatedStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = props.style;
        
            return (
              <Animated.View style={[animatedStyle, { backgroundColor: colors.surface }]} />
            );
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Teaching"
        component={TeachingScreen}
        initialParams={{ scrollTop }}
        options={{
          tabBarLabel: 'Didattica',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Agenda"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Places"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Luoghi',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      /> 
      <Tabs.Screen
      name="Services"
      component={EmptyScreen}
      options={{
        tabBarLabel: 'Servizi',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="location" color={color} size={size} />
        ),
      }}
    />
      <Tabs.Screen
        name="Profile"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Profilo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};




export type TabsNavigatorParamList = {
  Teaching: {
    scrollTop?: AnimatedValue;
  };
};