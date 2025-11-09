import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';

export default function LoadingOverlay({ label = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  label: {
    color: colors.text,
    marginTop: 10,
    fontWeight: '600',
    fontSize: 15,
  },
});
