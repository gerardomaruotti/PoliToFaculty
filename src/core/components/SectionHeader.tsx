import React from 'react';
import { StyleSheet, Text, useColorScheme, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { Separator } from './Separator';

type SectionHeaderProps = {
  title: string;
  linkTo: string; // Nome della schermata di destinazione
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Separator />
      <View style={styles.innerContainer}>
        <Text style={[styles.title, colorScheme === 'dark' ? styles.titleDark : null]}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate(linkTo)}>
          <Text style={[styles.link, colorScheme === 'dark' ? styles.linkDark : null]}>
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
    flexDirection: 'column',
    paddingHorizontal: 18,
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.primary700,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleDark: {
    color: colors.text50,
  },
  link: {
    color: colors.primary500,
  },
  linkDark: {
    color: colors.primary400,
  },
});
