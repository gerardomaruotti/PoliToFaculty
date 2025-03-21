import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface TranslucentViewProps {
  style?: StyleProp<ViewStyle>;
}

export const TranslucentView: React.FC<TranslucentViewProps> = ({ style }) => {
  return (
    <BlurView
      blurType="light"
      blurAmount={100}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.7)"
      style={[StyleSheet.absoluteFill, style]}
    />
  );
};

export default TranslucentView;
