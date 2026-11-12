import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { book } from '../data/book';
import { Control } from '../components/Control';
import { useReader } from '../components/ReaderProvider';
import { themes } from '../lib/theme';

export default function SceneScreen() {
  const params = useLocalSearchParams<{ page?: string; quote?: string }>();
  const index = Number(params.page);
  const page = Number.isInteger(index) ? book.pages[index] : undefined;
  const { theme, fontSize } = useReader();
  const colors = themes[theme];
  const quote = typeof params.quote === 'string' ? params.quote : '';
  function close() { if (router.canGoBack()) router.back(); else router.replace('/'); }
  return <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
    <View style={[styles.header, { borderBottomColor: colors.line }]}><Text accessibilityRole="header" style={[styles.heading, { color: colors.ink }]}>Inside the scene</Text><Control label="Close scene and return to book" onPress={close}>Close</Control></View>
    {page ? <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.image}><Image source={page.image} accessibilityLabel={page.imageDescription} style={{ width: '100%', height: '100%' }} resizeMode="contain" /></View>
      <View style={styles.description}><Text style={[styles.caption, { color: colors.muted }]}>An illustration of page {index + 1}</Text><Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>{page.title}</Text>
        <View style={[styles.quote, { borderLeftColor: colors.accent }]}><Text selectable style={[styles.quoteText, { color: colors.ink, fontSize, lineHeight: fontSize * 1.7 }]}>{quote || page.paragraphs[1].join(' ')}</Text></View>
        <Text style={[styles.note, { color: colors.muted }]}>One way to imagine it. The rest is yours.</Text>
        <Control label="Return to reading" onPress={close}>Back to the book</Control>
      </View>
    </ScrollView> : <View style={styles.description}><Text style={{ color: colors.ink }}>This scene could not be found.</Text><Control label="Return to book" onPress={close}>Back to the book</Control></View>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({ screen: { flex: 1 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8, borderBottomWidth: 1 }, heading: { fontSize: 16, fontWeight: '600' }, content: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingBottom: 28 }, image: { width: '100%', aspectRatio: 1.5 }, description: { paddingHorizontal: 28, paddingTop: 24 }, caption: { fontSize: 12, marginBottom: 10 }, title: { fontFamily: 'Literata', fontSize: 28, marginBottom: 24 }, quote: { borderLeftWidth: 2, paddingLeft: 18 }, quoteText: { fontFamily: 'Literata' }, note: { fontSize: 13, marginTop: 28, marginBottom: 20, textAlign: 'center' } });
