import { PropsWithChildren } from 'react';
import { StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';
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
    | 'link'
    | 'headline';
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
  headline: 'bold',
};

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
          color: typeof colors[variant] === 'string' ? colors[variant] : '#000', // ✅ Fallback a un colore valido
        } as TextStyle, // ✅ Assicura compatibilità con TextStyle
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
      fontSize: fontSizes.md,
    },
    secondaryText: {
      fontSize: fontSizes.sm,
    },
    link: {
      fontSize: fontSizes.md,
      textDecorationLine: 'underline',
    },
    headline: {
      fontSize: fontSizes['2xl'], // ✅ Usiamo '2xl' invece di 'xxl'
      fontWeight: 'bold',
    },
  });

