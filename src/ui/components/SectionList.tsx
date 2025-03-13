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
 
   return (
    <Card
    rounded={Platform.select({ android: false })}
       style={{
        marginVertical: spacing[2] as number,
        marginHorizontal: Platform.select({ ios: spacing[4] as number}),
       }}
     >
       {dividers
         ? Children.map(children, (c, i) => {
             return (
               <>
                 {c}
                 {i < Children.count(children) - 1 && (
                   <Divider
                     key={`div-${i}`}
                     style={{ marginStart: spacing[5] as number}}
                   />
                 )}
               </>
             );
            })
          : children}
      </Card>
   );
 };