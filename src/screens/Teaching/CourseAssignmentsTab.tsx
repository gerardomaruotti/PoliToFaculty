import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { List } from '../../ui/components/List';
import { ListItem } from '../../ui/components/ListItem';
import { useTheme } from '../../ui/hooks/useTheme';
import { useCourses } from '../../core/contexts/CoursesContext';
import { CourseTabProps } from './CourseScreen';
import React from 'react';

export const CourseAssignmentsTab = ({
  courseId,
  setIsRefreshing,
  shouldRefresh,
}: CourseTabProps) => {
  const { spacing } = useTheme();
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
      {/* Se non ci sono notifiche, mostra un caricamento */}
      {assignments.length === 0 ? (
        <ActivityIndicator style={{ marginVertical: spacing[8] as number }} />
      ) : (
        <List>
          {assignments.map(n => (
            <ListItem key={n.id} title={n.content} />
          ))}
        </List>
      )}
    </View>
  );
};
