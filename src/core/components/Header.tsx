import { JSX, useContext, useState } from 'react';
import { Animated, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  getDefaultHeaderHeight,
  HeaderBackground,
  HeaderOptions,
  HeaderShownContext,
  HeaderTitle,
  Layout,
} from '@react-navigation/elements';
import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { useTheme } from '../../ui/hooks/useTheme';

import { CollapsingHeaderContext } from '../contexts/CollapsingHeaderContext';
import React from 'react';


type Props = HeaderOptions & {
  /**
   * Whether the header is in a modal
   */
  modal?: boolean;
  /**
   * Layout of the screen.
   */
  layout?: Layout;
  /**
   * Title text for the header.
   */
  title: string;
  /**
   * The bottom view   
   * */

  bottom?: JSX.Element;
  
  headerLeftLabelVisible?: boolean;

  scrollTop?: Animated.Value;
};

const warnIfHeaderStylesDefined = (styles: Record<string, any>) => {
  Object.keys(styles).forEach(styleProp => {
    const value = styles[styleProp];

    if (styleProp === 'position' && value === 'absolute') {
      console.warn(
        "position: 'absolute' is not supported on headerStyle. If you would like to render content under the header, use the 'headerTransparent' option.",
      );
    } else if (value !== undefined) {
      console.warn(
        `${styleProp} was given a value of ${value}, this has no effect on headerStyle.`,
      );
    }
  });
};

export const Header = (props: Props) => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const { colors } = useNavigationTheme();
  const { spacing, fontSizes, fontFamilies } = useTheme();
  const [largeTitleHeight, setLargeTitleHeight] = useState(0);

  const isParentHeaderShown = useContext(HeaderShownContext);
   const { enabled, scrollTop } = useContext(CollapsingHeaderContext);

  const {
    title,
    bottom,
    layout = frame,
    modal = false,
    headerTitle: customTitle,
    headerTitleAlign = Platform.select({
      ios: 'center',
      default: 'left',
    }),
    headerLeft,
    headerLeftLabelVisible,
    headerTransparent,
    headerTintColor,
    headerBackground,
    headerRight,
    headerTitleAllowFontScaling: titleAllowFontScaling,
    headerTitleStyle: titleStyle,
    headerLeftContainerStyle: leftContainerStyle,
    headerRightContainerStyle: rightContainerStyle,
    headerTitleContainerStyle: titleContainerStyle,
    headerBackgroundContainerStyle: backgroundContainerStyle,
    headerStyle: customHeaderStyle,
    headerShadowVisible,
    headerPressColor,
    headerPressOpacity,
    headerStatusBarHeight = isParentHeaderShown ? 0 : insets.top,
  } = props;

  const defaultHeight = getDefaultHeaderHeight(
    layout,
    modal,
    headerStatusBarHeight,
  );

  const {
    height = defaultHeight,
    minHeight,
    maxHeight,
    backgroundColor,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderBottomWidth,
    borderColor,
    borderEndColor,
    borderEndWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRadius,
    borderRightColor,
    borderRightWidth,
    borderStartColor,
    borderStartWidth,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    borderTopWidth,
    borderWidth,
    boxShadow,
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    opacity,
    transform,
    ...unsafeStyles
  } = StyleSheet.flatten(customHeaderStyle || {}) as ViewStyle;

  if (process.env.NODE_ENV !== 'production') {
    warnIfHeaderStylesDefined(unsafeStyles);
  }



  const safeStyles: Record<string, unknown> = {
  backgroundColor,
  borderBottomColor,
  borderBottomEndRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderBottomStartRadius,
  borderBottomWidth,
  borderColor,
  borderEndColor,
  borderEndWidth,
  borderLeftColor,
  borderLeftWidth,
  borderRadius,
  borderRightColor,
  borderRightWidth,
  borderStartColor,
  borderStartWidth,
  borderStyle,
  borderTopColor,
  borderTopEndRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderTopStartRadius,
  borderTopWidth,
  borderWidth,
  boxShadow,
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  opacity,
  transform,
};

  // Setting a property to undefined triggers default style
  // So we need to filter them out
  // Users can use `null` instead
  for (const styleProp in safeStyles) {
    if (safeStyles[styleProp] === undefined) {
      delete safeStyles[styleProp];
    }
  }

  const backgroundStyle = [
    {
      borderBottomColor: colors.border,
      shadowColor: colors.border,
      ...styles.defaultBackgroundStyle,
      ...safeStyles,
    },
    headerShadowVisible === false && {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  ];
  console.log('Bg styles', backgroundStyle);

  const leftButton = headerLeft
    ? headerLeft({
        tintColor: headerTintColor,
        pressColor: headerPressColor,
        pressOpacity: headerPressOpacity,
      })
    : null;

  const rightButton = headerRight
    ? headerRight({
        tintColor: headerTintColor,
        pressColor: headerPressColor,
        pressOpacity: headerPressOpacity,
        canGoBack: false
    })
    : null;

  const headerTitle =
    typeof customTitle !== 'function'
      ? // eslint-disable-next-line @typescript-eslint/no-shadow
        (props: React.ComponentProps<typeof HeaderTitle>) => (
          <HeaderTitle {...props} />
        )
      : customTitle;

  return (
    <>
      <Animated.View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: 0,
            opacity: enabled
            ? scrollTop.interpolate({
                inputRange: [largeTitleHeight - 5, largeTitleHeight],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })
            : undefined,
          },
          backgroundContainerStyle,
        ]}
      >
        {headerBackground ? (
          headerBackground({
            style: backgroundStyle,
          })
        ) : headerTransparent ? null : (
          <HeaderBackground style={backgroundStyle} />
        )}
      </Animated.View>
      <Animated.View
        pointerEvents="box-none"
        style={[{ height, minHeight, maxHeight, opacity, transform }]}
      >
        <View pointerEvents="none" style={{ height: headerStatusBarHeight }} />
        <View pointerEvents="box-none" style={styles.content}>
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.left,
              headerTitleAlign === 'center' && styles.expand,
              { marginStart: insets.left },
              leftContainerStyle,
            ]}
          >
            {leftButton}
          </Animated.View>
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.title,
              {
                // Avoid the title from going offscreen or overlapping buttons
                maxWidth:
                  headerTitleAlign === 'center'
                    ? layout.width -
                      ((leftButton
                        ? headerLeftLabelVisible !== false
                          ? 80
                          : 32
                        : 16) +
                        Math.max(insets.left, insets.right)) *
                        2
                    : layout.width -
                      ((leftButton ? 72 : 16) +
                        (rightButton ? 72 : 16) +
                        insets.left -
                        insets.right),

                        opacity: enabled
                        ? scrollTop.interpolate({
                            inputRange: [largeTitleHeight - 5, largeTitleHeight],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                          })
                        : undefined,
              },
              titleContainerStyle,
            ]}
          >
            {headerTitle({
              children: title,
              allowFontScaling: titleAllowFontScaling,
              tintColor: headerTintColor,
              style: [
                {
                  fontFamily: `${fontFamilies.heading}-semibold`,
                },
                titleStyle,
              ],
            })}
          </Animated.View>
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.right,
              styles.expand,
              { marginEnd: insets.right },
              rightContainerStyle,
            ]}
          >
            {rightButton}
          </Animated.View>
        </View>
      </Animated.View>
      {enabled && (
        <Animated.View
        style={{
          paddingLeft: typeof spacing[4] === 'number' ? spacing[4] : 0, // Assicurati che sia un numero
          paddingRight: typeof spacing[4] === 'number' ? spacing[4] : 0, // Assicurati che sia un numero
          height:
            largeTitleHeight !== 0
              ? scrollTop.interpolate({
                  inputRange: [0, largeTitleHeight],
                  outputRange: [largeTitleHeight, 0],
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp',
                })
              : undefined,
          overflow: 'hidden',
        }}
      >
        {headerTitle({
          children: title,
          allowFontScaling: titleAllowFontScaling,
          tintColor: headerTintColor,
          onLayout: e => {
            const { height: titleHeight } = e.nativeEvent.layout;
            if (titleHeight > 0 && !largeTitleHeight) {
              setLargeTitleHeight(titleHeight);
            }
          },
          style: [
            titleStyle,
            {
              fontFamily: `${fontFamilies.heading}-semibold`,
              height: largeTitleHeight > 0 ? largeTitleHeight : undefined,
              fontSize: fontSizes['4xl'],
              transform: [
                {
                  translateY: scrollTop.interpolate({
                    inputRange: [0, 10],
                    outputRange: [0, -10],
                    extrapolate: 'extend',
                  }),
                },
              ],
            },
          ],
        })}
      </Animated.View>
            )}
 
            {bottom && bottom}
          </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  title: {
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  expand: {
    flexGrow: 1,
    flexBasis: 0,
  },
  defaultBackgroundStyle: {
    ...Platform.select({
      android: {
        elevation: 4,
        width: '100%',
        height: '100%',
      },
      ios: {
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: StyleSheet.hairlineWidth,
        },
      },
      default: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
});