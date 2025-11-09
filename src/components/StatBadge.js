import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function StatBadge({ label, value }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.val}>{value}</Text>
      <Text style={styles.lbl}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surfaceAlt, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', minWidth: 90
  },
  val: { color: 'white', fontSize: 18, fontWeight: '800' },
  lbl: { color: colors.muted, fontSize: 12, marginTop: 2 }
});
