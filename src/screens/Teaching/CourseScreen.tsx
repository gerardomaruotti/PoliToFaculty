import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../../ui/components/Text';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SubHeader } from '../../core/components/SubHeader';
import { useSubHeader } from '../../core/hooks/useSubHeader';
import { useTabs } from '../../core/hooks/useTabs';
import { CourseInfoTab } from './CourseInfoTab';
//import { CourseLecturesTab } from '.CourseLecturesTab';
import {CourseAssignmentsTab} from './CourseAssignmentsTab'
import { CourseNoticesTab } from './CourseNoticesTab';
import { TeachingStackParamList } from './TeachingNavigator';
import { useCourses } from '../../core/contexts/CoursesContext'; // Import del context
import React from 'react';
import { Theme } from '../../ui/types/theme';
import { useStylesheet } from '../../ui/hooks/useStylesheet';
import { useCollapsingHeader } from '../../core/components/useCollapsingHeader';


export type CourseTabProps = {
  courseId: number;
  setIsRefreshing: (value: boolean) => void;
  shouldRefresh: boolean;
};

export const CourseScreen = () => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();
  const { subHeaderProps } = useSubHeader();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { fakeCourses, managedCourses, selectedCourse } = useCourses(); // Recupero i corsi dal context
  const styles = useStylesheet(createStyles);

  const course = selectedCourse;

  useEffect(() => {
    const headerTitle = course?.title || 'Course';
    setOptions({
      headerTitle,
      headerBackTitleVisible: headerTitle.length <= 20,
    });
  }, [course?.title, course]);

  useEffect(() => {
    if (!isRefreshing) {
      setShouldRefresh(false);
    }
  }, [isRefreshing]);

  if (!course) {
    return <Text>No course found</Text>; // Aggiungi una gestione di errore nel caso il corso non sia trovato
  }

  const refreshControlProps = {
    setIsRefreshing,
    shouldRefresh,
  };

  const { Tabs, TabsContent } = useTabs([
    {
      title: t('Info'),
      renderContent: () => (
        <CourseInfoTab courseId={course.id} {...refreshControlProps} />
      ),
    },
    {
      title: t('Avvisi'),
      renderContent: () => (
        <CourseNoticesTab courseId={course.id} {...refreshControlProps} />
      ),
    },
    {
      title: t('Materiale'),
      renderContent: () => (
        <View>
              <Text>Files</Text>
            </View>
      ),
    },
    {
      title: t('Elaborati'),
      renderContent: () => (
        <CourseAssignmentsTab courseId={course.id} {...refreshControlProps}></CourseAssignmentsTab>
      ),
    },
  ]);

  return (
    <ScrollView>
      <View  >
        <SubHeader {...subHeaderProps}>
        <Tabs />
      </SubHeader>
      <TabsContent />
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
