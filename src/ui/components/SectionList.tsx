
import React from 'react';
import { PropsWithChildren } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { List } from '../../ui/components/List';
import { useTheme } from '../hooks/useTheme';
import { Card } from './Card';

type Props = PropsWithChildren<{
  dividers?: boolean;
  loading?: boolean;
}>;

/**
 * Displays a list of items with automatic dividers inside a card.
 * (Only suitable for short non virtual-scrolled lists)
 */
export const SectionList = ({ children, loading = false, dividers }: Props) => {
  const { spacing } = useTheme();

  return (
    <Card
      rounded={Platform.select({ android: false })}
      style={{
        marginVertical: spacing[2] as number,
        marginHorizontal: Platform.select({ ios: spacing[4] as number}),
      }}
    >
      {loading ? (
        <ActivityIndicator
          style={{
            marginVertical: spacing[8] as number,
          }}
        />
      ) : (
        <List dividers={dividers}>{children}</List>
      )}
    </Card>
  );
};