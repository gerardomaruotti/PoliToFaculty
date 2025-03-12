import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { AgendaScreen } from '../../screens/AgendaScreen';
 import { LectureScreen } from '../../screens/LectureScreen';
 
 const Stack = createNativeStackNavigator();
 
 export const AgendaNavigator = () => {
 
   return (
     <Stack.Navigator>
       <Stack.Screen
         name="Home"
         component={AgendaScreen}
         options={{
           headerTitle: 'Agenda',
         }}
       />
       <Stack.Screen
         name="Lecture"
         component={LectureScreen}
         options={{
           headerTitle: 'Lecture',
         }}
       />
     </Stack.Navigator>
   );
 };