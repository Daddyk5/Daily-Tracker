export const todayKey = () => new Date().toISOString().slice(0,10);

export const prettyDate = (isoDate) => {
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return isoDate;
  }
};
