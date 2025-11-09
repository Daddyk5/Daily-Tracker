import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LayoutCard from '../components/LayoutCard';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { useTracker } from '../context/TrackerContext';
import LoadingOverlay from '../components/LoadingOverlay';
import StatBadge from '../components/StatBadge';
import { todayKey } from '../utils/date';

export default function HomeScreen({ navigation }) {
  const { entries, booting } = useTracker();
  if (booting) return <LoadingOverlay label="Preparing your tracker..." />;

  const today = todayKey();
  const todayEntry = entries.find(e => e.date === today);

  const avgMood = entries.length ? (entries.reduce((a, b) => a + (b.mood || 0), 0) / entries.length).toFixed(1) : '–';
  const totalWater = entries.reduce((a, b) => a + (Number(b.water) || 0), 0);
  const totalTasks = entries.reduce((a, b) => a + (Number(b.tasks) || 0), 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <LayoutCard>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>
          {todayEntry ? `Mood ${todayEntry.mood}/5 • Water ${todayEntry.water} • Tasks ${todayEntry.tasks}` : 'No entry yet'}
        </Text>
        <PrimaryButton title={todayEntry ? 'Update Today' : 'Add Today\'s Entry'} onPress={() => navigation.navigate('Add')} />
      </LayoutCard>

      <View style={styles.grid}>
        <StatBadge label="Avg Mood" value={avgMood} />
        <StatBadge label="Total Water" value={totalWater} />
        <StatBadge label="Total Tasks" value={totalTasks} />
      </View>

      <LayoutCard>
        <Text style={styles.title}>History</Text>
        <PrimaryButton title="Open History" onPress={() => navigation.navigate('History')} />
      </LayoutCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { color: 'white', fontSize: 18, fontWeight: '800' },
  subtitle: { color: colors.muted, marginBottom: 10 },
  grid: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' }
});
