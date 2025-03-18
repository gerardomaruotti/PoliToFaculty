import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from '../ui/components/ListItem';
import { Section } from '../ui/components/Section';
import { SectionHeader } from '../ui/components/SectionHeader';
import { SectionList } from '../ui/components/SectionList';
import { useStylesheet } from '../ui/hooks/useStylesheet';
import { useTheme } from '../ui/hooks/useTheme';
import { Theme } from '../ui/types/theme';
import { useCollapsingHeader } from '../core/components/useCollapsingHeader';
import { useCourses } from '../core/contexts/CoursesContext';


export const CoursesScreen = () => {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const { scrollViewProps } = useCollapsingHeader();
  const { fakeCourses, fakeExams, fakeGrades } = useCourses(); // Usa il hook per ottenere i dati


  // 📌 Raggruppa i corsi per periodo
  const coursesByPeriod = fakeCourses.reduce((acc, course) => {
    (acc[course.period] = acc[course.period] || []).push(course);
    return acc;
  }, {} as Record<string, typeof fakeCourses>);

  return (
    <ScrollView  {...scrollViewProps}>
      <View style={styles.sectionsContainer}>
      {Object.entries(coursesByPeriod).map(([period, courses]) => (
        <Section key={period}>
          <SectionHeader title={`${t('Period')} ${period}`} linkTo={''} />
          <SectionList>
            {courses.map(course => (
              <ListItem
                key={course.id}
                linkTo={"Course"}
                title={course.title}
                subtitle={course.subtitle}
              />
            ))}
          </SectionList>
        </Section>
      ))}
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
