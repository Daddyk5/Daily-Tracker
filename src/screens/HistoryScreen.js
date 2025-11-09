import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
    <LayoutCard style={{ marginBottom: 12 }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>All Entries</Text>
        <PrimaryButton title="Clear All" onPress={() => setConfirm(true)} />
      </View>
    </LayoutCard>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.empty}>No entries yet. Add your first one!</Text>
        }
        renderItem={({ item }) => (
          <LayoutCard style={{ marginBottom: 10 }}>
            <EntryItem item={item} onDelete={onDelete} />
          </LayoutCard>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { color: 'white', fontSize: 18, fontWeight: '800' },
  empty: { color: colors.muted, marginTop: 20, textAlign: 'center' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
