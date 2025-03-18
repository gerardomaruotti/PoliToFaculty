import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '../../ui/components/Card';
import { ListItem } from '../../ui/components/ListItem';
import { SectionHeader } from '../../ui/components/SectionHeader';
import { SectionList } from '../../ui/components/SectionList';
import { useStylesheet } from '../../ui/hooks/useStylesheet';
import { Theme } from '../../ui/types/theme';
import { useCollapsingHeader } from '../../core/components/useCollapsingHeader';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCourses } from '../../core/contexts/CoursesContext';

export const TeachingScreen = () => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const { scrollViewProps } = useCollapsingHeader();
  const { fakeCourses, fakeExams, fakeGrades, setSelectedCourse } = useCourses(); // Usa il hook per ottenere i dati
  const navigation = useNavigation();


  return (
    <ScrollView {...scrollViewProps}>
      <View style={styles.sectionsContainer}>

        {/* 📌 CORSI */}
        <View style={styles.section}>
          <SectionHeader title={t('Courses')} linkTo="Courses" />
          <SectionList>
            {fakeCourses.map(course => (
              <ListItem
                key={course.id}
                title={course.title}
                subtitle={course.subtitle}
                onPress={() => {
                  setSelectedCourse(course)
                  navigation.navigate("Course");
                }}
              />
            ))}
          </SectionList>
        </View>

        {/* 📌 ESAMI */}
        <View style={styles.section}>
          <SectionHeader title={t('Exams')} linkTo="Exams" />
          <View style={styles.cardContainer}>
            {fakeExams.map(exam => (
              <Card key={exam.id} style={styles.card}>
                <View>
                  <ListItem
                    title={exam.subject}
                    subtitle={`Data: ${exam.date} | Stato: ${exam.status}`}
                  />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 📌 VOTI */}
        <View style={styles.section}>
          <SectionHeader title={t('Transcript')} linkTo="Grades" />
          <View style={styles.cardContainer}>
            {fakeGrades.map((grade, index) => (
              <Card key={index} style={styles.card}>
                <ListItem title={grade.subject} subtitle={`Voto: ${grade.grade}`} />
              </Card>
            ))}
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    sectionsContainer: {
      paddingVertical: spacing[5] as number,
    },
    section: {
      marginBottom: spacing[5] as number,
    },
    cardContainer: {
      flexDirection: 'column',
      gap: spacing[3] as number,
      paddingHorizontal: spacing[4] as number,
    },
    card: {
      padding: spacing[3] as number,
    },
  });
