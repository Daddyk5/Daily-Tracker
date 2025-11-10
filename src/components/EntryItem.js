import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { prettyDate } from '../utils/date';

export default function EntryItem({ item, onDelete }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.date}>{prettyDate(item.date)}</Text>
        <Text style={styles.text}>
          Mood: {item.mood}/5 • Productivity: {item.tasks}
        </Text>
        {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
      </View>

      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteBtn}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surfaceAlt,
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  date: { color: 'white', fontWeight: '800' },
  text: { color: colors.text },
  notes: { color: colors.muted, marginTop: 4 },
  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'transparent',
  },
  deleteText: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
