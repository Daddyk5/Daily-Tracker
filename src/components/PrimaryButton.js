import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function PrimaryButton({ title, onPress, style, variant = 'primary' }) {
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        isDanger ? styles.dangerBtn : styles.primaryBtn,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.txt, isDanger ? styles.dangerTxt : styles.primaryTxt]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1.3,
  },
  primaryBtn: {
    borderColor: colors.accent,
    backgroundColor: 'transparent',
  },
  dangerBtn: {
    borderColor: colors.danger,
    backgroundColor: 'transparent',
  },
  txt: {
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  primaryTxt: {
    color: colors.accent,
  },
  dangerTxt: {
    color: colors.danger,
  },
});
