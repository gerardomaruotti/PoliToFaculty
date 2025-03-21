import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, ScrollView } from 'react-native';
import { ListItem } from '../../ui/components/ListItem';
import { MetricCard } from '../../ui/components/MetricCard';
import { Section } from '../../ui/components/Section';
import { SectionHeader } from '../../ui/components/SectionHeader';
import { SectionList } from '../../ui/components/SectionList';
import { useTheme } from '../../ui/hooks/useTheme';
import { CourseTabProps } from './CourseScreen';
import { useCourses } from '../../core/contexts/CoursesContext';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBottomBarAwareStyles } from '../../core/hooks/useBottomBarAwareStyles';

export const CourseInfoTab = ({
  courseId,
  setIsRefreshing,
}: CourseTabProps) => {
  const { t } = useTranslation();
  const { spacing, colors } = useTheme();
  const { selectedCourse } = useCourses();
  const navigation = useNavigation();
  const bottomBarAwareStyles = useBottomBarAwareStyles();



  const pictureStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  };
  // Se nessun corso è selezionato, mostra un messaggio di errore
  if (!selectedCourse) {
    return (
      <View style={{ padding: spacing[5] as number }}>
        <Text style={{ textAlign: 'center', fontSize: 16, color: 'red' }}>
          {t('No course selected')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={bottomBarAwareStyles}
    >
      <View style={{ padding: spacing[5] as number }}>
        <View style={{ flexDirection: 'row', marginBottom: spacing[5] as number }}>
          <MetricCard
            metrics={[
              { name: 'Iscritti', value: selectedCourse.registered },
              { name: 'Crediti', value: `${selectedCourse.cfu} cfu` },
            ]}
          />
        </View>
      </View>
      
      {/* Sezione per lo staff */}
      <View>
        <SectionHeader title={"Staff"} linkTo="AgendaScreen" />
        <SectionList>
          {selectedCourse.staff.map(staff => (
             <ListItem
             key={staff.id}
             leadingItem={
                 <View
                   style={[
                     pictureStyle,
                     {
                       backgroundColor: colors.background,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                     },
                   ]}
                 >
                   <Ionicons name="person-outline" color={colors.heading} size={20} />
                 </View>
               
             }
             title={`${staff.name}`}
             subtitle={`${staff.role}`}
             linkTo="Person"
             
           />
          ))}
        </SectionList> 
      </View> 
      
      {/* Sezione per gli appelli */}
      <View>
        <SectionHeader title={"Appelli"} linkTo="AgendaScreen" />
        <SectionList>
          {selectedCourse.examcalls.map(call => (
            <ListItem
              key={call.id}
              title={call.name}
              subtitle={call.date}
              onPress={() => {
                navigation.navigate("Course");
              }}
            />
          ))}
        </SectionList> 
      </View> 
      
      {/* Sezione per altro */}
      <Section>
        <SectionHeader title={"Altro"} linkTo="" />
        <SectionList>
          <ListItem title={t('Course guide')} linkTo="CourseGuide" />
        </SectionList> {/* Chiusura SectionList per altro */}
      </Section> {/* Chiusura Section per altro */}
    </ScrollView>
  );
};
