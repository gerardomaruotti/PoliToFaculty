import { PropsWithChildren } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import React from 'react';

type Props = PropsWithChildren<{
  name?: string;
  value?: string;
  style?: object;
}>;

export const Card = ({ name, value, children, style }: Props) => {
  const { colors, shapes } = useTheme();

  return (
    <View
      style={[styles.card, { borderRadius: Platform.select({ ios: shapes.lg }) }, style]}
    >
      {name && <Text style={styles.cardName}>{name}</Text>}
      {value && <Text style={styles.cardValue}>{value}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
    color: 'gray',
  },
});
