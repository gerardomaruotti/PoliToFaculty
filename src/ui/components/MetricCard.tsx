import React, { JSX } from 'react';
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Card, Props as CardProps } from './Card';

interface Metric {
  name: string;
  value: string | number | JSX.Element;
}

interface Props {
  metrics: Metric[];  // Array di coppie name-value
  style?: ViewStyle;  // Opzionale per aggiungere uno stile personalizzato al card
}

/**
 * A card used to present multiple metrics with a caption
 */
export const MetricCard = ({
  metrics,
  style,
  ...rest
}: CardProps & Props) => {
  const { colors, spacing, fontSizes, fontWeights } = useTheme();

  return (
    <Card
      style={[
        {
          flex: 1,
          padding: spacing[5] as number,
        },
        style,
      ]}
      {...rest}
    >
      <View style={styles.metricRow}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricColumn}>
            <Text style={{ color: colors.secondaryText, marginBottom: spacing[1] as number }}>
              {metric.name}
            </Text>
            {['string', 'number'].includes(typeof metric.value) ? (
              <Text
                style={{
                  color: colors.prose,
                  fontSize: fontSizes.lg,
                  fontWeight: fontWeights.semibold,
                }}
              >
                {metric.value}
              </Text>
            ) : (
              metric.value
            )}
          </View>
        ))}
      </View>
    </Card>
  );
};

// Stili per la visualizzazione delle metriche
const styles = StyleSheet.create({
  metricRow: {
    flexDirection: 'row', // Dispone le colonne in orizzontale
    flexWrap: 'wrap', // Permette che i valori si spostino sulla riga successiva se necessario
    justifyContent: 'space-between', // Spazio tra le colonne
  },
  metricColumn: {
    flex: 1, // Ogni colonna occupa lo stesso spazio
    alignItems: 'center', // Centra il contenuto della colonna
    marginBottom: 10, // Distanza tra le righe di colonne
  },
});
