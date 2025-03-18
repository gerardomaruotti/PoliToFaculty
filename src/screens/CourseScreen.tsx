import React from 'react';
import { Text, View } from 'react-native';
import { useCourses } from '../core/contexts/CoursesContext';

export const CourseScreen = () => {
  const { fakeCourses, fakeExams, fakeGrades, selectedCourse } = useCourses(); // Ottieni setSelectedCourse dal contesto

  return (
    <View>
      <Text>Course {selectedCourse?.id} </Text>
    </View>
  );
};