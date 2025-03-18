import { Children, PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { Divider } from '../../ui/components/Divider';
import { useTheme } from '../../ui/hooks/useTheme';
import React from 'react';

interface Props {
  dividers?: boolean;
}

/**
 * Renders a list of items with automatic dividers based
 * on the platform
 */
export const List = ({
  dividers = Platform.select({ ios: true, android: false }),
  children,
}: PropsWithChildren<Props>) => {
  const { spacing } = useTheme();

  return (
    <>
      {dividers
        ? Children.map(children, (c, i) => {
            return (
              <>
                {c}
                {i < Children.count(children) - 1 && (
                  <Divider
                    key={`div-${i}`}
                    style={{ marginStart: spacing[5] as number }}
                  />
                )}
              </>
            );
          })
        : children}
    </>
  );
};