import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center'
  },
  txt: { color: 'white', fontWeight: '700', fontSize: 16 }
});
