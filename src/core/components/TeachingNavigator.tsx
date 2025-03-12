import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoursesScreen } from '../../screens/CoursesScreen';
import { ExamsScreen } from '../../screens/ExamsScreen';
import { GradesScreen } from '../../screens/GradesScreen';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SectionHeader } from '../../ui/components/SectionHeader';

const Stack = createNativeStackNavigator();

const TeachingHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sectionsContainer}>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
          <SectionHeader title="Corsi" linkTo="Courses" />
        </TouchableOpacity>
        <Text>Lorem ipsum dolor sit amet</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('Exams')}>
          <SectionHeader title="Esami" linkTo="Exams" />
        </TouchableOpacity>
        <Text>Lorem ipsum dolor sit amet</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('Grades')}>
          <SectionHeader title="Voti" linkTo="Grades" />
        </TouchableOpacity>
        <Text>Lorem ipsum dolor sit amet</Text>
      </View>
    </View>
  );
};

export const TeachingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TeachingHome">
      <Stack.Screen name="TeachingHome" component={TeachingHome} options={{ title: 'Didattica' }} />
      <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'Corsi' }} />
      <Stack.Screen name="Exams" component={ExamsScreen} options={{ title: 'Esami' }} />
      <Stack.Screen name="Grades" component={GradesScreen} options={{ title: 'Voti' }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  sectionsContainer: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
});
