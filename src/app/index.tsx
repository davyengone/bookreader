import { useRef, useState, type ComponentRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { book } from '../data/book';
import { Control } from '../components/Control';
import { useReader } from '../components/ReaderProvider';
import { themes } from '../lib/theme';
import { selectSentence, selectedText, selectionBounds, type Selection } from '../lib/selection';

export default function ReaderScreen() {
  const { theme, setTheme, fontSize, setFontSize } = useReader();
  const colors = themes[theme];
  const [pageIndex, setPageIndex] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const page = book.pages[pageIndex];
  const sentences = page.paragraphs.flat();
  const quote = selectedText(sentences, selection);
  const bounds = selection ? selectionBounds(selection) : null;

  function changePage(next: number) {
    setPageIndex(next);
    setSelection(null);
    scroll.current?.scrollTo({ y: 0, animated: false });
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { borderBottomColor: colors.line }]}>
        <View style={styles.brand}><Text style={[styles.brandName, { color: colors.ink }]}>Book Reader</Text><Text style={[styles.bookName, { color: colors.muted }]}>{book.title}</Text></View>
        <Control label="Reading settings" active={settingsOpen} onPress={() => setSettingsOpen(!settingsOpen)}>Aa</Control>
      </View>

      {settingsOpen ? <View style={[styles.settings, { backgroundColor: colors.surface }]}>
        <View style={styles.settingsRow}><Text style={{ color: colors.muted }}>Text size</Text><View style={styles.row}>{[17, 19, 23].map((size, i) => <Control key={size} label={`${['Small', 'Medium', 'Large'][i]} text`} active={fontSize === size} onPress={() => setFontSize(size)}>{['S', 'M', 'L'][i]}</Control>)}</View></View>
        <View style={styles.settingsRow}><Text style={{ color: colors.muted }}>Appearance</Text><View style={styles.row}><Control label="Paper appearance" active={theme === 'paper'} onPress={() => setTheme('paper')}>Paper</Control><Control label="Night appearance" active={theme === 'night'} onPress={() => setTheme('night')}>Night</Control></View></View>
      </View> : null}

      <ScrollView ref={scroll} style={styles.scroll} contentContainerStyle={styles.readingArea}>
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterCount, { color: colors.accent }]}>A short story in two pages</Text>
          <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>{page.title}</Text>
          <View style={[styles.chapterRule, { backgroundColor: colors.accent }]} />
        </View>
        <Text style={[styles.hint, { color: colors.muted }]}>Tap a sentence to picture the scene.</Text>
        {page.paragraphs.map((paragraph, paragraphIndex) => {
          const offset = page.paragraphs.slice(0, paragraphIndex).reduce((sum, p) => sum + p.length, 0);
          return <Text key={`${pageIndex}-${paragraphIndex}`} style={[styles.paragraph, { color: colors.ink, fontSize, lineHeight: fontSize * 1.75 }]}>
            {paragraph.map((sentence, sentenceIndex) => {
              const index = offset + sentenceIndex;
              const isSelected = bounds !== null && index >= bounds[0] && index <= bounds[1];
              return <Text key={index} accessibilityRole="button" accessibilityLabel={sentence} accessibilityHint="Select this sentence, or extend your selected passage to here" accessibilityState={{ selected: isSelected }} onPress={() => setSelection(current => selectSentence(current, index))}
                style={isSelected ? { backgroundColor: colors.selected } : undefined}>{sentence}{sentenceIndex < paragraph.length - 1 ? ' ' : ''}</Text>;
            })}
          </Text>;
        })}
        <Text style={[styles.endMark, { color: colors.muted }]}>{pageIndex === 0 ? 'The story continues' : 'The end'}</Text>
      </ScrollView>

      {selection ? <View style={[styles.selectionBar, { backgroundColor: colors.surface, borderTopColor: colors.line }]}>
        <View style={styles.selectionSummary}><Text accessibilityLiveRegion="polite" style={[styles.selectionLabel, { color: colors.ink }]}>{bounds ? bounds[1] - bounds[0] + 1 : 0} {bounds && bounds[0] !== bounds[1] ? 'sentences' : 'sentence'} selected</Text><Text style={[styles.selectionHint, { color: colors.muted }]}>Tap another to extend.</Text></View>
        <Control label="Clear selection" onPress={() => setSelection(null)}>Clear</Control>
        <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/scene', params: { page: String(pageIndex), quote } })} style={({ pressed }) => [styles.sceneButton, { opacity: pressed ? 0.7 : 1 }]}><Text style={styles.sceneButtonText}>See scene</Text></Pressable>
      </View> : null}

      <View style={[styles.footer, { borderTopColor: colors.line }]}>
        <Control label="Previous page" disabled={pageIndex === 0} onPress={() => changePage(pageIndex - 1)}>‹ Back</Control>
        <View style={styles.progress}><Text style={[styles.pageNumber, { color: colors.muted }]}>Page {pageIndex + 1} of {book.pages.length}</Text><View style={styles.dots}>{book.pages.map((_, index) => <View key={index} style={[styles.dot, { backgroundColor: index === pageIndex ? colors.accent : colors.line }]} />)}</View></View>
        <Control label={pageIndex === 0 ? 'Next page' : 'Read again'} onPress={() => changePage(pageIndex === 0 ? 1 : 0)}>{pageIndex === 0 ? 'Next ›' : 'Again'}</Control>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, topBar: { paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, gap: 12 },
  brand: { flex: 1, gap: 3 }, brandName: { fontSize: 16, fontWeight: '600' }, bookName: { fontSize: 12 },
  settings: { paddingHorizontal: 24, paddingVertical: 8 }, settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }, row: { flexDirection: 'row', gap: 4 },
  scroll: { flex: 1 }, readingArea: { width: '100%', maxWidth: 640, alignSelf: 'center', paddingHorizontal: 28, paddingBottom: 24 },
  chapterHeader: { paddingTop: 34, paddingBottom: 22 }, chapterCount: { fontSize: 12, marginBottom: 12 }, title: { fontFamily: 'Literata', fontSize: 32, lineHeight: 43 }, chapterRule: { width: 32, height: 2, marginTop: 22 },
  hint: { fontSize: 12, marginBottom: 22 }, paragraph: { fontFamily: 'Literata', marginBottom: 20 }, endMark: { fontFamily: 'Literata', fontSize: 14, textAlign: 'center', paddingVertical: 20 },
  selectionBar: { borderTopWidth: 1, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }, selectionSummary: { flexGrow: 1, paddingRight: 4 }, selectionLabel: { fontSize: 13, fontWeight: '600' }, selectionHint: { fontSize: 11, marginTop: 4 }, sceneButton: { backgroundColor: '#245C64', minHeight: 44, paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12 }, sceneButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  footer: { borderTopWidth: 1, paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, progress: { alignItems: 'center', gap: 7 }, pageNumber: { fontSize: 12 }, dots: { flexDirection: 'row', gap: 5 }, dot: { width: 18, height: 3, borderRadius: 2 },
});
