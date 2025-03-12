import { Link } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SectionHeader } from '../ui/components/SectionHeader';
 
 export const AgendaScreen = () => {
   return (
        <View>
        <View style={styles.sectionsContainer}>
        <View style={styles.section}>
            <SectionHeader title="Lezione" linkTo="Lecture" />
            <Text>Lorem ipsum dolor sit amet</Text>
        </View>
        </View>
        </View>
   );
 };


 
 const styles = StyleSheet.create({
   sectionsContainer: {
     display: 'flex',
     paddingVertical: 18,
   },
   section: {
     marginBottom: 24,
   },
 });