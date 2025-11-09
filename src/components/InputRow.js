import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function InputRow({ label, value, onChangeText, keyboardType = 'default', multiline = false, placeholder }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        multiline={multiline}
        returnKeyType="done"
        blurOnSubmit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.text, marginBottom: 6, fontWeight: '700' },
  input: { backgroundColor: colors.surfaceAlt, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: 'white' }
});
