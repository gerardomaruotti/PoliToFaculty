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
import { TeachingScreen } from '../../screens/TeachingScreen';
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


     <TabsNav.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarStyle,
        tabBarBackground: Platform.select({
          ios: () => <TranslucentView />,
        }),
        header: ({ options, route }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Header
              {...options}
              title={title}
              bottom={
                <Tabs selectedIndexes={[0]}>
                  <Tab>Info</Tab>
                  <Tab>Notices</Tab>
                  <Tab>Material</Tab>
                  <Tab>Homework</Tab>
                  <Tab>Homework</Tab>
                  <Tab>Homework</Tab>
                  <Tab>Homework</Tab>
                </Tabs>
              }
            />
          );
        },
        headerTitleStyle: { color: colors.heading },
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
      <TabsNav.Screen
        name="Teaching"
        component={TeachingScreen}
        options={{
          tabBarLabel: 'Didattica',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <TabsNav.Screen
        name="Agenda"
        component={EmptyScreen}
        options={{
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