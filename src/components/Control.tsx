import { Pressable, StyleSheet, Text } from 'react-native';
import { useReader } from './ReaderProvider';
import { themes } from '../lib/theme';

type Props = { label: string; children: string; onPress: () => void; disabled?: boolean; active?: boolean };
export function Control({ label, children, onPress, disabled = false, active = false }: Props) {
  const { theme } = useReader();
  const colors = themes[theme];
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled, selected: active }} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor: active ? colors.selected : 'transparent', opacity: disabled ? 0.35 : pressed ? 0.6 : 1 }]}>
      <Text style={[styles.text, { color: colors.ink }]}>{children}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({ button: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, borderRadius: 12 }, text: { fontSize: 16, fontWeight: '500' } });
