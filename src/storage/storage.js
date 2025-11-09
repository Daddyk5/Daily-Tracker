import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = '@daily_tracker_entries_v2';

export async function loadEntries() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveEntries(entries) {
  await AsyncStorage.setItem(KEY, JSON.stringify(entries));
}

export async function upsertEntry(entry) {
  const entries = await loadEntries();
  const idx = entries.findIndex(e => e.id === entry.id);
  let updated = [];
  if (idx >= 0) {
    entries[idx] = entry;
    updated = [...entries];
  } else {
    updated = [entry, ...entries];
  }
  await saveEntries(updated.slice(0, 500));
  return updated.slice(0, 500);
}

export async function deleteEntry(id) {
  const entries = await loadEntries();
  const filtered = entries.filter(e => e.id !== id);
  await saveEntries(filtered);
  return filtered;
}

export async function clearAll() {
  await AsyncStorage.removeItem(KEY);
  return [];
}
