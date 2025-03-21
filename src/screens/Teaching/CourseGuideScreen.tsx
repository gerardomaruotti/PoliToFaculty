import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCourses } from '../../core/contexts/CoursesContext';
import React from 'react';
import { Theme } from '../../ui/types/theme';
import { useStylesheet } from '../../ui/hooks/useStylesheet';
import { useCollapsingHeader } from '../../core/hooks/useCollapsingHeader';




export const CourseGuideScreen =  ()  => {
  const { selectedCourse } = useCourses();
  const styles = useStylesheet(createStyles);
  const { scrollViewProps } = useCollapsingHeader();

  return (
    <ScrollView {...scrollViewProps}>
          <View style={styles.sectionsContainer} >

            <Text style={{ fontWeight: 'bold' }}>{selectedCourse?.guide}</Text>
          </View>

          </ScrollView>
  );
};



const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    loader: {
      marginVertical: spacing[8] as number,
    },
    sectionsContainer: {
      paddingVertical: spacing[5] as number,
    },
  });