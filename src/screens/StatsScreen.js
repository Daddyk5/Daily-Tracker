import { View, Text, StyleSheet } from 'react-native';
import LayoutCard from '../components/LayoutCard';
import colors from '../theme/colors';
import { useTracker } from '../context/TrackerContext';

export default function StatsScreen() {
  const { entries } = useTracker();

  const total = entries.length;
  const avgMood = total ? (entries.reduce((a, e) => a + (e.mood || 0), 0) / total).toFixed(2) : '–';
  const totalWater = entries.reduce((a, e) => a + (Number(e.water) || 0), 0);
  const totalTasks = entries.reduce((a, e) => a + (Number(e.tasks) || 0), 0);

  return (
    <View style={styles.container}>
      <LayoutCard>
        <Text style={styles.title}>Overall Stats</Text>
        <Row label="Total Entries" value={total} />
        <Row label="Average Mood" value={avgMood} />
        <Row label="Total Water" value={totalWater} />
        <Row label="Total Tasks" value={totalTasks} />
      </LayoutCard>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, gap: 16 },
  title: { color: 'white', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.surfaceAlt, padding: 12, borderRadius: 12, marginTop: 8 },
  label: { color: colors.muted },
  value: { color: 'white', fontWeight: '800' }
});
