import React from 'react';
import { StyleSheet, useColorScheme, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { colors } from '../../core/constants/colors';
import { Separator } from './Separator';
import { useTheme } from '../hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeachingScreen } from '../../screens/TeachingScreen';
import { EmptyScreen } from '../../screens/EmptyScreen';
import {Link} from '@react-navigation/native'
import { Text } from './Text';

type SectionHeaderProps = {
  title: string;
  linkTo: string; // Nome della schermata di destinazione
};
const Stack = createNativeStackNavigator();

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Separator />
      <View style={styles.innerContainer}>
        <Text
          variant="title"
          style={{
            color: colors.heading,
          }}
          accessible={true}
          accessibilityRole="header"
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




const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 18,
  },
  innerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});


