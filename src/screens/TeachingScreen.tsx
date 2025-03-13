import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '../ui/components/Card';
import { ListItem } from '../ui/components/ListItem';
import { SectionHeader } from '../ui/components/SectionHeader';
import { SectionList } from '../ui/components/SectionList';
import { useStylesheet } from '../ui/hooks/useStylesheet';
import { Theme } from '../ui/types/theme';
import { useCollapsingHeader } from '../core/components/useCollapsingHeader';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmptyScreen } from './EmptyScreen';


export const TeachingScreen = () => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const { scrollViewProps } = useCollapsingHeader();

  return (
    <ScrollView {...scrollViewProps}>
      <View style={styles.sectionsContainer}>
        <View style={styles.section}>
          <SectionHeader title={t('Courses')} linkTo="Agenda" />
          <SectionList>
            <ListItem
              title="Test"
              subtitle="Test subtitle"
              linkTo="Agenda"
            />
            <ListItem title="Test" subtitle="Test subtitle" />
            <ListItem title="Test" subtitle="Test subtitle" />
            <ListItem title="Test" subtitle="Test subtitle" />
          </SectionList>
        </View>
        <View style={styles.section}>
          <SectionHeader title={t('Exams')} linkTo="Esami" />
          <View style={{ padding: 18 }}>
            <View style={{ flexDirection: 'row', marginBottom: 18 }}>
              <Card name="Title" value="Metric" style={{ marginRight: 18 }} />
              <Card name="Title" value="Metric" />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Card name="Title" value="Metric" style={{ marginRight: 18 }} />
              <Card name="Title" value="Metric" />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <SectionHeader title={t('Transcript')} linkTo="Voti" />
          <Card name="Physics 1" style={{ margin: 18 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque libero maxime quia ratione suscipit.
          </Card>
        </View>
        <View style={{ height: 2000 }}></View>
      </View>
    </ScrollView>
  );
};



const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    sectionsContainer: {
      display: 'flex',
      paddingVertical: spacing[5] as number,
    },
    section: {
      marginBottom: spacing[5] as number,
    },
  });
