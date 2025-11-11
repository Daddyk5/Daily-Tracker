import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LayoutCard from '../components/LayoutCard';
import EntryItem from '../components/EntryItem';
import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import { useTracker } from '../context/TrackerContext';
import colors from '../theme/colors';

export default function HistoryScreen() {
  const { entries, remove, clear } = useTracker();
  const [confirm, setConfirm] = useState(false);

  const onDelete = async (id) => await remove(id);

  const renderHeader = () => (
    <LayoutCard style={styles.headerCard}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>All Entries</Text>

        {entries.length > 0 && (
          <TouchableOpacity
            onPress={() => setConfirm(true)}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.subtitle}>
        View or remove your past entries below
      </Text>
    </LayoutCard>
  );

  return (
    <LinearGradient
      colors={[colors.background, '#0e1433', '#090f23']}
      style={styles.gradient}
    >
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.empty}>No entries yet. Add your first one!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <LayoutCard style={styles.entryCard}>
            <EntryItem item={item} onDelete={onDelete} />
          </LayoutCard>
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      <AppModal
        visible={confirm}
        title="Confirm"
        message="This will delete all entries. Continue?"
        onClose={async () => {
          setConfirm(false);
          await clear();
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 92, 255, 0.2)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  entryCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.25)',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 14,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'transparent',
  },
  clearText: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 60,
  },
  empty: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
