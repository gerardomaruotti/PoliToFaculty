import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Section } from '../ui/components/Section';
import { SectionList } from '../ui/components/SectionList';
import { ListItem } from '../ui/components/ListItem';
import { useCourses } from '../core/contexts/CoursesContext';
import { useBottomBarAwareStyles } from '../core/contexts/useBottomBarAwareStyles';
import { useTheme } from '../ui/hooks/useTheme';
import { useStylesheet } from '../ui/hooks/useStylesheet';
import { Theme } from '../ui/types/theme';
import { useCollapsingHeader } from '../core/components/useCollapsingHeader';

export const ExamsScreen = () => {
  const { spacing } = useTheme();
    const { fakeCourses, fakeExams, setSelectedCourse, managedCourses} = useCourses(); // Usa il hook per ottenere i dati
    const bottomBarAwareStyles = useBottomBarAwareStyles();
      const styles = useStylesheet(createStyles);
      const { scrollViewProps } = useCollapsingHeader();
    
  return (
    <ScrollView
    {...scrollViewProps}
     >
      <View style={styles.sectionsContainer}>
       
         <Section>
           <SectionList>
             {fakeExams.map(exam => (
               <ListItem
                 key={exam.id}
                 linkTo="Exam"
                 title={exam.subject}
                 subtitle={`${exam.date.toLocaleString()} - aula da definire`}
               />
             ))}
           </SectionList>
         </Section>
         <View style={styles.paddingView}> </View >
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
    paddingView: {
      height: 50, // Aggiungi uno spazio extra, modifica a piacere
      backgroundColor: 'transparent', // Componente trasparente
    },
  });