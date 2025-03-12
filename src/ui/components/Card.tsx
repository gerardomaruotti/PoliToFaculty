import { PropsWithChildren } from 'react';
 import { Platform, View } from 'react-native';
 import { useTheme } from '../hooks/useTheme';
import React from 'react';
 
 type Props = PropsWithChildren;
 
 export const Card = ({ children }: Props) => {
   const { colors, shapes } = useTheme();
   return (
     <View
       style={{
         flexDirection: 'column',
         borderRadius: Platform.select({
           ios: shapes.lg,
         }),
         backgroundColor: colors.surface,
       }}
     >
       {children}
     </View>
   );
 };