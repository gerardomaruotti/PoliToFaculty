import React from 'react';
import { StyleSheet, useColorScheme, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { colors } from '../../core/constants/colors';
import { Separator } from './Separator';
import { useTheme } from '../hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeachingScreen } from '../../screens/Teaching/TeachingScreen';
import { EmptyScreen } from '../../screens/EmptyScreen';
import {Link} from '@react-navigation/native'
import { Text } from './Text';
import { Theme } from '../types/theme';
import { useStylesheet } from '../hooks/useStylesheet';

type SectionHeaderProps = {
  title: string;
  linkTo: string; // Nome della schermata di destinazione
};
const Stack = createNativeStackNavigator();

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = useStylesheet(createStyles);

  return (
    <View style={styles.container}>
      <Separator />
      <View style={styles.innerContainer}>
      <Text
          variant="title"
          style={styles.title}
          accessible={true}
          accessibilityRole="header"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(linkTo)}>
        <Text variant="link">Vedi tutto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};




const createStyles = ({ spacing, colors }: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing[5] as number,
    },
    title: {
      color: colors.heading,
      flex: 1,
      marginEnd: spacing[5] as number,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });


