import { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
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
  const [water, setWater] = useState(String(existing?.water ?? '0'));
  const [tasks, setTasks] = useState(String(existing?.tasks ?? '0'));
  const [notes, setNotes] = useState(existing?.notes || '');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (existing) {
      setMood(existing.mood);
      setWater(String(existing.water));
      setTasks(String(existing.tasks));
      setNotes(existing.notes || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = async () => {
    const entry = {
      id: today,
      date: today,
      mood: Number(mood),
      water: Number(water) || 0,
      tasks: Number(tasks) || 0,
      notes: notes?.trim()
    };
    await save(entry);
    setModal(true);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
          <LayoutCard>
            <InputRow label="Water (glasses)" value={water} onChangeText={setWater} keyboardType="numeric" placeholder="0" />
            <InputRow label="Tasks Completed" value={tasks} onChangeText={setTasks} keyboardType="numeric" placeholder="0" />
            <InputRow label="Notes" value={notes} onChangeText={setNotes} multiline placeholder="How did your day go?" />

            <View style={styles.pickerBlock}>
              <InputLabel text="Mood (1-5)" />
              <View style={styles.pickerWrap}>
                <Picker selectedValue={mood} onValueChange={setMood} dropdownIconColor="white">
                  {[1,2,3,4,5].map(n => <Picker.Item key={n} label={String(n)} value={n} color="#000" />)}
                </Picker>
              </View>
            </View>

            <PrimaryButton title="Save Entry" onPress={onSave} />
          </LayoutCard>

          <AppModal
            visible={modal}
            title="Saved!"
            message="Your daily entry has been saved locally."
            onClose={() => setModal(false)}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function InputLabel({ text }) { return <View style={{ marginBottom: 6 }}><TextStyle text={text} /></View>; }
function TextStyle({ text }) { return null; } // placeholder to avoid import cycles (we'll style via InputRow labels)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  pickerBlock: { marginTop: 6 },
  pickerWrap: { backgroundColor: colors.surfaceAlt, borderRadius: 12, overflow: 'hidden' }
});
