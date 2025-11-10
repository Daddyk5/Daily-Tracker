import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LayoutCard from '../components/LayoutCard';
import colors from '../theme/colors';
import { useTracker } from '../context/TrackerContext';
import LoadingOverlay from '../components/LoadingOverlay';
import StatBadge from '../components/StatBadge';
import { todayKey } from '../utils/date';

export default function HomeScreen({ navigation }) {
  const { entries, booting } = useTracker();
  if (booting) return <LoadingOverlay label="Preparing your tracker..." />;

  const today = todayKey();
  const todayEntry = entries.find((e) => e.date === today);

  const avgMood = entries.length
    ? (entries.reduce((a, b) => a + (b.mood || 0), 0) / entries.length).toFixed(1)
    : '–';
  const totalSleep = entries.reduce((a, b) => a + (Number(b.sleep) || 0), 0);
  const totalTasks = entries.reduce((a, b) => a + (Number(b.tasks) || 0), 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <LayoutCard>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>
          {todayEntry
            ? `Mood ${todayEntry.mood}/5 • Sleep ${todayEntry.sleep}h • Tasks ${todayEntry.tasks}`
            : 'No entry yet'}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          activeOpacity={0.7}
          style={styles.outlinedBtn}
        >
          <Text style={styles.outlinedText}>
            {todayEntry ? 'Update Today' : "Add Today's Entry"}
          </Text>
        </TouchableOpacity>
      </LayoutCard>

      <View style={styles.grid}>
        <StatBadge label="Avg Mood" value={avgMood} />
        <StatBadge label="Total Sleep" value={totalSleep} />
        <StatBadge label="Total Tasks" value={totalTasks} />
      </View>

      <LayoutCard>
        <Text style={styles.title}>History</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.7}
          style={styles.outlinedBtn}
        >
          <Text style={styles.outlinedText}>Open History</Text>
        </TouchableOpacity>
      </LayoutCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  subtitle: { color: colors.muted, marginBottom: 10 },
  grid: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },

  outlinedBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 8,
  },
  outlinedText: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
