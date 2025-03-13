import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    ReactNode,
  } from 'react';
  import { ScrollView, ScrollViewProps, View } from 'react-native';
  import { useTheme } from '../hooks/useTheme';
  import { Props as TabProps } from './Tab';
  import React from 'react';
  
  interface Props {
    selectedIndexes?: number[];
  }
  
  /**
   * A horizontally scrolling tab bar.
   * To control the selection state of child tabs set the `selectedIndexes`
   * prop to an array of indexes. Leave it undefined to manually control the
   * selection on the children.
   */
  export const Tabs = ({
    children,
    selectedIndexes,
    ...rest
  }: PropsWithChildren<ScrollViewProps & Props>) => {
    const { spacing } = useTheme();
  
    return (
      <ScrollView
        accessible={true}
        accessibilityRole="tablist"
        horizontal
        contentContainerStyle={{
          paddingHorizontal: spacing[4] as number,
          paddingVertical: spacing[2] as number,
        }}
        {...rest}
      >
        {Children.map(children, (c: ReactNode, i) => {
          // Ensure `c` is a valid React element of type TabProps
          if (isValidElement(c)) {
            const child = c as ReactElement<TabProps>;
  
            if (selectedIndexes != null) {
              return (
                <>
                  {cloneElement(child, { selected: selectedIndexes.includes(i) })}
                  {i < Children.count(children) - 1 && (
                    <View
                      style={{
                        width: spacing[2] as number,
                      }}
                    />
                  )}
                </>
              );
            }
  
            return child; // Return the child if no `selectedIndexes` is provided
          }
          return null; // Return null for invalid or undefined children
        })}
      </ScrollView>
    );
  };
  