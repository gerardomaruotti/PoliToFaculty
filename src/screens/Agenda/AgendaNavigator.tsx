import { useTranslation } from 'react-i18next';
import { Animated, Platform, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../ui/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AgendaScreen } from './AgendaScreen';
import { LectureScreen } from './LectureScreen';
import { titlesStyles } from '../../core/hooks/titlesStyles';
import { Logo } from '../../core/components/Logo';

export type TeachingStackParamList = {
  Agenda: undefined;
  Lezione : undefined;
};

const Stack = createNativeStackNavigator<TeachingStackParamList>();

export const AgendaNavigator = () => {
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
      ...titlesStyles(colors),
    }}
  >
      <Stack.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
            headerLargeTitle: false,
            headerLeft: () => <Logo />,
            headerTitle: t('Agenda'),
            headerTransparent: false,
          headerShadowVisible: false,
          }}
      />
      <Stack.Screen
        name="Lezione"
        component={LectureScreen}
        options={{
            headerTitle:"Lezione",
          }}
      />
      
    </Stack.Navigator>
  );
};