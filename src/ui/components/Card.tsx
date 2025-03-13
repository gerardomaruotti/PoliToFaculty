import React from 'react';
import { PropsWithChildren } from 'react';
import { Platform, View, ViewProps, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export type Props = PropsWithChildren<
  ViewProps & {
    name?: string;
    value?: string;
    rounded?: boolean;
  }
>;

export const Card = ({ name, value, children, style, rounded = true, ...rest }: Props) => {
  const { colors, shapes } = useTheme();

  const shadow = Platform.OS === 'android' ? { 
    shadowColor: colors.primary[700], 
    elevation: 2 
  } : {};

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          borderRadius: rounded ? shapes.lg : 0,
          backgroundColor: colors.surface,
          ...shadow,
          overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
          padding: 10,
        },
        style,
      ]}
      {...rest}
    >
      {name && <Text style={{ fontWeight: 'bold', color: String(colors.text) }}>{name}</Text>}
      {value && <Text style={{ color: String(colors.text) }}>{value}</Text>}


      {children}
    </View>
  );
};
