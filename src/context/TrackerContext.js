import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { upsertEntry, deleteEntry, loadEntries, clearAll } from '../storage/storage';

const TrackerContext = createContext();

export function TrackerProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await loadEntries();
      setEntries(data);
      setBooting(false);
    })();
  }, []);

  const value = useMemo(() => ({
    entries,
    booting,
    save: async (entry) => {
      const updated = await upsertEntry(entry);
      setEntries(updated);
    },
    remove: async (id) => {
      const updated = await deleteEntry(id);
      setEntries(updated);
    },
    clear: async () => {
      const empty = await clearAll();
      setEntries(empty);
    }
  }), [entries, booting]);

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export const useTracker = () => useContext(TrackerContext);
