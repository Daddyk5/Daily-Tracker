import { Modal, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import colors from '../theme/colors';

export default function AppModal({ visible, title, message, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.msg}>{message}</Text> : null}
          <PrimaryButton title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', padding: 24 },
  panel: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, gap: 12 },
  title: { color: 'white', fontSize: 18, fontWeight: '800' },
  msg: { color: colors.muted }
});
