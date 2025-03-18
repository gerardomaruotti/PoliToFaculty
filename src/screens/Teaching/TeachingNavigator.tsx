import { useTranslation } from 'react-i18next';
import { Animated, Platform, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../ui/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourseScreen } from '../CourseScreen';
import { CoursesScreen } from '../CoursesScreen';
import { ExamScreen } from '../ExamScreen';
import { ExamsScreen } from '../ExamsScreen';
import { GradesScreen } from '../GradesScreen';
import { HomeScreen } from '../HomeScreen';
import { EmptyScreen } from '../EmptyScreen';
import React from 'react';
import { TeachingScreen } from './TeachingScreen';
import TranslucentView from '../../core/components/TranslucentView';
import { getHeaderTitle } from '@react-navigation/elements';
import { Header } from '../../core/components/Header';

export type TeachingStackParamList = {
  Home: undefined;
  Courses: undefined;
  Course: { id: number; courseName: string };
  CourseGuide: { courseId: number };
  CourseVideolecture: { courseId: number; lectureId: number };
  CourseVirtualClassroom: { courseId: number; lectureId: number };
  CourseAssignmentUpload: { courseId: number };
  Exams: undefined;
  Exam: { id: number };
  Grades: undefined;
};

const Stack = createNativeStackNavigator<TeachingStackParamList>();

export const TeachingNavigator = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const tabBarStyle: any = {
    position: Platform.select({ ios: 'absolute' }),
  };
  if (Platform.OS === 'ios') {
    tabBarStyle.height = 84;
  }
  return (
    
    <Stack.Navigator
  screenOptions={{
    header: ({ options, route }) => {
      const title = getHeaderTitle(options, route.name);
      return <Header {...options} title={title} />;
    },
    headerTitleStyle: { color: colors.heading },
    headerTransparent: true,
    headerBackground: Platform.select({
      ios: () => <TranslucentView />,
      android: () => <Animated.View style={{ backgroundColor: colors.surface }} />,
    }),
  }}
>
      <Stack.Screen
        name="Home"
        component={TeachingScreen}
        /*options={{
          headerShown : false
        }} */
      />
      <Stack.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          headerTitle: t('Courses'),
        }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerLargeTitle: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="CourseGuide" component={EmptyScreen} />
      <Stack.Screen
        name="CourseVideolecture"
        component={EmptyScreen}
      />
      <Stack.Screen
        name="CourseVirtualClassroom"
        component={EmptyScreen}
      />
      <Stack.Screen
        name="CourseAssignmentUpload"
        component={EmptyScreen}
      />

      <Stack.Screen
        name="Exams"
        component={ExamsScreen}
        options={{
          headerTitle: t('Exams'),
        }}
      />
      <Stack.Screen name="Exam" component={ExamScreen} />

      <Stack.Screen
        name="Grades"
        component={GradesScreen}
        options={{
          headerTitle: t('Transcript'),
        }}
      />
    </Stack.Navigator>
  );
};