export type Selection = { anchor: number; end: number } | null;

export function selectSentence(current: Selection, index: number): Selection {
  if (!current) return { anchor: index, end: index };
  if (current.anchor === index && current.end === index) return null;
  return { anchor: current.anchor, end: index };
}

export function selectionBounds(selection: NonNullable<Selection>) {
  return [Math.min(selection.anchor, selection.end), Math.max(selection.anchor, selection.end)] as const;
}

export function selectedText(sentences: string[], selection: Selection) {
  if (!selection) return '';
  const [start, end] = selectionBounds(selection);
  return sentences.slice(start, end + 1).join(' ');
}
