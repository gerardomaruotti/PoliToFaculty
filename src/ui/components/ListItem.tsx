import React, { JSX } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { Text } from './Text';

interface Props {
  title: string;
  subtitle: string;
  leadingItem?: JSX.Element;
  trailingItem?: JSX.Element;
  linkTo?: string; // Nome della schermata di destinazione
}

/**
 * List item con titolo, sottotitolo, leading e trailing elements.
 * Se `linkTo` è presente, viene mostrata una freccia su iOS.
 */
export const ListItem = ({
  title,
  subtitle,
  leadingItem,
  trailingItem,
  linkTo,
  onPress,
  ...rest
}: TouchableOpacityProps & Props) => {
  const { fontSizes, colors, spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (linkTo) {
          navigation.navigate(linkTo as never); // Correzione per TypeScript
        } else if (onPress) {
          onPress();
        }
      }}
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
            <Text variant="title" weight="normal">
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
});
