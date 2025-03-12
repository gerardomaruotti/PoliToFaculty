import { Children, PropsWithChildren } from 'react';
 import { Platform, View } from 'react-native';
 import { useTheme } from '../hooks/useTheme';
 import { Card } from './Card';
 import { Divider } from './Divider';
import React from 'react';
 
 type Props = PropsWithChildren<{
   dividers?: boolean;
 }>;
 
 export const SectionList = ({
   children,
   dividers = Platform.select({ ios: true, android: false }),
 }: Props) => {
   const { spacing } = useTheme();
   const childrenArray = Children.toArray(children);
 
   return (
     <View
       style={{
         paddingVertical: spacing[2] as number,
         paddingHorizontal: Platform.select({ ios: spacing[4] as number }),
       }}
     >
       <Card>
         {dividers
           ? childrenArray.map((c, i) => (
               <>
                 {c}
                 {i < childrenArray.length - 1 && (
                   <Divider
                     key={`div-${i}`}
                     style={{ marginStart: spacing[5] as number}}
                   />
                 )}
               </>
             ))
           : children}
       </Card>
     </View>
   );
 };