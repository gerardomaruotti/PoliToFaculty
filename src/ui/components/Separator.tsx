import { View } from 'react-native';
 import { useTheme } from '../hooks/useTheme';
import React from 'react';
 
 export const Separator = () => {
  const { colors, spacing } = useTheme();   return (
     <View
       style={{
         width: 32,
         height: 4,
         marginBottom: spacing[2] as number,          
         backgroundColor: colors.secondary[600],
       }}
     />
   );
 };