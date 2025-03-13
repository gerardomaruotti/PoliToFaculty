import { PropsWithChildren } from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { useStylesheet } from '../hooks/useStylesheet';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types/theme';
import React from 'react';

interface Props {
  variant?:
    | 'heading'
    | 'title'
    | 'prose'
    | 'secondaryText'
    | 'caption'
    | 'link';
  weight?: keyof Theme['fontWeights'];
  italic?: boolean;
}

const defaultWeights = {
  heading: 'bold',
  title: 'semibold',
  caption: 'bold',
  link: 'normal',
  prose: 'normal',
  secondaryText: 'normal',
};

/**
 * A wrapper around RN's Text component that applies basic theme
 * styles
 */
export const Text = ({
  variant = 'prose',
  weight,
  italic = false,
  style,
  children,
  ...rest
}: PropsWithChildren<TextProps & Props>) => {
  const { colors, fontFamilies } = useTheme();
  const styles = useStylesheet(createStyles);
  const fontFamilyName =
    variant === 'heading' ? fontFamilies.heading : fontFamilies.body;
  const fontFamily = `${fontFamilyName}-${weight ?? defaultWeights[variant]}${
    italic ? '-italic' : ''
  }`;

  return (
    <RNText
      style={[
        {
          fontFamily,
          color: colors[variant],
        },
        styles[variant],
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const createStyles = ({ fontSizes }: Theme) =>
  StyleSheet.create({
    heading: {
      fontSize: fontSizes.xl,
    },
    title: {
      fontSize: fontSizes.lg,
    },
    caption: {
      fontSize: fontSizes.xs,
      textTransform: 'uppercase',
    },
    prose: {
      fontSize: fontSizes.md, // add font size for prose
    },
    secondaryText: {
      fontSize: fontSizes.sm, // add font size for secondaryText
    },
    link: {
      fontSize: fontSizes.md, // add font size for link
      textDecorationLine: 'underline', // add some styling for links
    },
  });
