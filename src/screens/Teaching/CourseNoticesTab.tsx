import { Fragment, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { List } from '../../ui/components/List';
import { ListItem } from '../../ui/components/ListItem';
import { useTheme } from '../../ui/hooks/useTheme';
import { useCourses } from '../../core/contexts/CoursesContext';
import { CourseTabProps } from './CourseScreen';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CourseNoticesTab = ({ courseId }: CourseTabProps) => {
  const { fakeCourses } = useCourses();
  const { fontSizes, colors, spacing } = useTheme();
  
  // Troviamo il corso corrispondente
  const course = fakeCourses.find(course => course.id === courseId);

  // Se il corso non esiste, restituiamo null
  if (!course) {
    return null;
  }

  const { notices } = course; // Otteniamo le notifiche del corso

  return (
    <View>
      <List>
        {notices.map((notice, index) => (
          <Fragment key={notice.id}>
            <ListItem
              title={notice.title}
              subtitle={`${notice.date.toLocaleString()} - ${notice.content}`}
              onPress={() => {
                console.log(`Pressed on ${notice.title}`);
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
