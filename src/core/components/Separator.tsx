import React from 'react';

import { StyleSheet, View } from 'react-native';
import  {colors} from '../constants/colors';

export const Separator = () => <View style={styles.separator} />;


const styles = StyleSheet.create({
  separator: {
    width: 32,
    height: 4,
    marginBottom: 8,
    backgroundColor: colors.secondary600,
  },
});