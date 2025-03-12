import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { ProfileScreen } from '../../screens/ProfileScreen';
 import { NotificationsScreen } from '../../screens/NotificationsScreen';
 import { SettingsScreen } from '../../screens/SettingScreen';
 
 const Stack = createNativeStackNavigator();
 
 export const ProfileNavigator = () => {
   
 
   return (
     <Stack.Navigator>
       <Stack.Screen
         name="Home"
         component={ProfileScreen}
         options={{
           headerTitle: 'Profilo',
         }}
       />
     </Stack.Navigator>
   );
 };