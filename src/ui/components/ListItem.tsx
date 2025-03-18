import React, { JSX } from 'react';
import {
  View,
  TouchableHighlight,
  Platform,
  TouchableHighlightProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { Text } from './Text';

interface Props {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  leadingItem?: JSX.Element;
  trailingItem?: JSX.Element;
  linkTo?: string;
}

/**
 * A list item with support for a title, subtitle, leading and trailing
 * elements. If a linkTo is provided, a forward icon is automatically
 * displayed as a trailing element on iOS.
 */
export const ListItem = ({
  title,
  subtitle,
  leadingItem,
  trailingItem,
  linkTo,
  onPress,
  ...rest
}: TouchableHighlightProps & Props) => {
  const { fontSizes, colors, spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={colors.touchableHighlight}
      onPress={
        linkTo
          ? () => {
              navigation.navigate(linkTo);
            }
          : onPress
      }
      {...rest}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing[5] as number,
          paddingVertical: spacing[2] as number,
        }}
      >
        {leadingItem}
        <View style={{ flex: 1 }}>
          {typeof title === 'string' ? (
            <Text
              variant="title"
              style={{
                fontSize: fontSizes.md,
              }}
              weight="normal"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <Text
              variant="secondaryText"
              style={{
                fontSize: fontSizes.sm,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          ) : (
            subtitle
          )}
        </View>
        {linkTo && Platform.OS === 'ios' ? (
          <Ionicons
            name="chevron-forward-outline"
            color={colors.secondaryText}
            size={fontSizes['2xl']}
          />
        ) : (
          trailingItem
        )}
      </View>
    </TouchableHighlight>
  );
};