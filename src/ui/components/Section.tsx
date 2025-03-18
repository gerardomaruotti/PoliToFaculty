import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../ui/hooks/useTheme';
import React from 'react';

export const Section = ({
  style,
  children,
  ...rest
}: PropsWithChildren<ViewProps>) => {
  const { spacing } = useTheme();
  return (
    <View
      style={[
        style,
        {
          marginBottom: spacing[5] as number,
        },
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};