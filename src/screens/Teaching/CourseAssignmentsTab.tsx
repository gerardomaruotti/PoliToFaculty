import { Fragment, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { List } from '../../ui/components/List';
import { ListItem } from '../../ui/components/ListItem';
import { useTheme } from '../../ui/hooks/useTheme';
import { useCourses } from '../../core/contexts/CoursesContext';
import { CourseTabProps } from './CourseScreen';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CourseAssignmentsTab = ({
  courseId,
  setIsRefreshing,
  shouldRefresh,
}: CourseTabProps) => {
  const { fontSizes, colors, spacing } = useTheme();
  const { fakeCourses, addNoticeToCourse, removeNoticeFromCourse } = useCourses();

  // Otteniamo il corso per il quale vogliamo visualizzare le notifiche
  const course = fakeCourses.find(course => course.id === courseId);

  // Se non esiste il corso, ritorniamo null
  if (!course) {
    return null;
  }

  const { assignments } = course; // Prendiamo le notifiche del corso

  // Gestiamo lo stato di caricamento
  useEffect(() => setIsRefreshing(false), [assignments]);

  useEffect(() => {
    if (shouldRefresh) {
      setIsRefreshing(true);
      // Se necessario, possiamo aggiungere logiche di aggiornamento
      // Esempio: chiamare un'API o una funzione per aggiornare le notifiche
    }
  }, [shouldRefresh, setIsRefreshing]);

  return (
    <View>
          <List>
            {assignments.map((assignment, index) => (
              <Fragment key={assignment.id}>
                <ListItem
                  title={assignment.content}
                  subtitle={`${assignment.date.toLocaleString()}`}
                  onPress={() => {
                    console.log(`Pressed on ${assignment.id}`);
                  }} // 🔹 Correzione: onPress ora è una funzione valida
                  trailingItem={
                    <Ionicons
                      name="chevron-down-outline"
                      color={colors.secondaryText}
                      size={fontSizes['2xl']}
                      style={{ marginRight: -spacing[1] }}
                    />
                  }
                />
              </Fragment>
            ))}
          </List>
        </View>
  );
};
