
  import React from 'react';
  import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
  } from 'react';
  import { ScrollView, ScrollViewProps, View } from 'react-native';
  import { useTheme } from '../hooks/useTheme';
  import { Props as TabProps } from './Tab';
  
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
        {Children.toArray(children).map((child, i) => {
  if (!isValidElement<TabProps>(child)) return null; // Evita errori se non è un elemento valido

  const isSelected = selectedIndexes?.includes(i) ?? false;
  const clonedChild = cloneElement(child, { selected: isSelected });

  return (
    <React.Fragment key={i}>
      {clonedChild}
      {i < Children.count(children) - 1 && (
        <View
          style={{
            width: spacing[2] as number,
          }}
        />
      )}
    </React.Fragment>
  );
})}
      </ScrollView>
    );
  };