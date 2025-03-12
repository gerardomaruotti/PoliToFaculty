import { View } from 'react-native';
 import { useTheme } from '../hooks/useTheme';
import React from 'react';
 
 export const Separator = () => {
   const { colors } = useTheme();
   return (
     <View
       style={{
         width: 32,
         height: 4,
         marginBottom: 8,
         backgroundColor: colors.secondary[600],
       }}
     />
   );
 };