export const themes = {
  paper: { background: '#F7F9F6', ink: '#203739', muted: '#5C706E', line: '#DBE3DD', accent: '#245C64', selected: '#D9E9DF', surface: '#EBF0EA' },
  night: { background: '#14282D', ink: '#E5EDE7', muted: '#ADBEB8', line: '#385055', accent: '#B3D9CD', selected: '#365C58', surface: '#203B40' },
};
export type ThemeName = keyof typeof themes;
