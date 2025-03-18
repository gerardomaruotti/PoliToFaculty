import { JSX, PropsWithChildren } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Card, Props as CardProps } from './Card';
import { LiveIndicator } from './LiveIndicator';
import { Text } from './Text';
import React from 'react';

interface Props {
  /**
   * The event title
   */
  title: string | JSX.Element;
  /**
   * The color of the event
   */
  color?: string;
  /**
   * Shows a live indicator
   */
  live?: boolean;
  /**
   * Event time information
   */
  time?: string;
  /**
   * A subtitle (ie event type)
   */
  subtitle?: string;
}

/**
 * A card used to present an agenda item
 */
export const AgendaCard = ({
  title,
  style,
  color,
  live = true,
  time = '--:--',
  subtitle,
  children,
  ...rest
}: PropsWithChildren<CardProps & Props>) => {
  const { colors, spacing, fontSizes, fontWeights } = useTheme();
  const borderColor = color ?? colors.primary[500];

  return (
    <TouchableHighlight>
      <Card
        style={[
          {
            flex: 1,
            padding: spacing[5] as number,
            borderWidth: 2,
            borderColor,
          },
          style,
        ]}
        {...rest}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {typeof title === 'string' ? (
            <Text
              variant="title"
              style={{
                flex: 1,
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )}
          {live && <LiveIndicator />}
          <Text variant="secondaryText" style={{ fontSize: fontSizes.xs }}>
            {time}
          </Text>
        </View>
        {subtitle && (
          <Text
            variant="caption"
            style={{
              marginTop: spacing[1.5] as number,
            }}
          >
            {subtitle}
          </Text>
        )}
        {typeof children === 'string' ? (
          <Text style={{ marginTop: spacing[2.5] as number}}>{children}</Text>
        ) : (
          children
        )}
      </Card>
    </TouchableHighlight>
  );
};