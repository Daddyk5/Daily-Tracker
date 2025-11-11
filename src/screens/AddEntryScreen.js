import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PrimaryButton from '../components/PrimaryButton';
import LayoutCard from '../components/LayoutCard';
import AppModal from '../components/AppModal';
import colors from '../theme/colors';
import { useTracker } from '../context/TrackerContext';
import { todayKey } from '../utils/date';
import InputRow from '../components/InputRow';

export default function AddEntryScreen() {
  const { entries, save } = useTracker();
  const today = todayKey();
  const existing = entries.find(e => e.date === today);

  const [mood, setMood] = useState(existing?.mood || 3);
  const [sleep, setSleep] = useState(String(existing?.sleep ?? '0'));
  const [tasks, setTasks] = useState(String(existing?.tasks ?? '0'));
  const [notes, setNotes] = useState(existing?.notes || '');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (existing) {
      setMood(existing.mood);
      setSleep(String(existing.sleep ?? '0'));
      setTasks(String(existing.tasks ?? '0'));
      setNotes(existing.notes || '');
    }
  }, []);

  const onSave = async () => {
    const entry = {
      id: today,
      date: today,
      mood: Number(mood),
      sleep: Number(sleep) || 0,
      tasks: Number(tasks) || 0,
      notes: notes?.trim(),
    };
    await save(entry);
    setModal(true);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <LayoutCard style={styles.card}>
          <InputRow
            label="Sleep (hours)"
            value={sleep}
            onChangeText={setSleep}
            keyboardType="numeric"
            placeholder="0"
          />
          <InputRow
            label="Tasks Completed"
            value={tasks}
            onChangeText={setTasks}
            keyboardType="numeric"
            placeholder="0"
          />
          <InputRow
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="How did your day go?"
          />

          <View style={styles.pickerBlock}>
            <Text style={styles.pickerLabel}>Mood (1-5)</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={mood}
                onValueChange={setMood}
                dropdownIconColor="white"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <Picker.Item key={n} label={String(n)} value={n} color="#000" />
                ))}
              </Picker>
            </View>
          </View>

          <PrimaryButton
            title="Save Entry"
            onPress={onSave}
            style={styles.clearButton}
            textStyle={styles.clearButtonText}
          />
        </LayoutCard>

        <AppModal
          visible={modal}
          title="Saved!"
          message="Your daily entry has been saved locally."
          onClose={() => setModal(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  pickerBlock: {
    marginTop: 12,
  },
  pickerLabel: {
    marginBottom: 6,
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  pickerWrap: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    overflow: 'hidden',
  },
  clearButton: {
    backgroundColor: '#ff4757',
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});
