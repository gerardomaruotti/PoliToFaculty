import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import React from 'react';

interface Prop {
  style?: StyleProp<ViewStyle>;
}

export const Divider = ({ style = {} }: Prop) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          minWidth: StyleSheet.hairlineWidth,
          minHeight: StyleSheet.hairlineWidth,
          backgroundColor: colors.divider,
        },
        style,
      ]}
    ></View>
  );
};