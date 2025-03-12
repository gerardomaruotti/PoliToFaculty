import React from 'react';
import { StyleSheet, Text, useColorScheme, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { colors } from '../../core/constants/colors';
import { Separator } from './Separator';
import { useTheme } from '../hooks/useTheme';

type SectionHeaderProps = {
  title: string;
  linkTo: string; // Nome della schermata di destinazione
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Separator />
      <View style={styles.innerContainer}>
        <Text style={[styles.title, {color: colors.heading}]}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate(linkTo)}>
          <Text style={[styles.link, {color: colors.heading}]}>
            Vedi tutto
          </Text>
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