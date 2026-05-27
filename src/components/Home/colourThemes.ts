export const themes = [
  { id: 'default',        label: 'Default' },
  { id: 'night',          label: 'Night' },
  { id: 'protanopia',     label: 'Protanopia' },
  { id: 'deuteranopia',   label: 'Deuteranopia' },
  { id: 'tritanopia',     label: 'Tritanopia' },
  { id: 'monochrome',     label: 'Monochrome' },
  { id: 'high-contrast',  label: 'High contrast' },
] as const;

export type ThemeId = typeof themes[number]['id'];

export const themeColors: Record<string, string> = {
  default:         '#f3e6eb',
  night:           '#1c1018',
  protanopia:      '#edf3fa',
  deuteranopia:    '#f2eefa',
  tritanopia:      '#fef6f0',
  monochrome:      '#f5f5f5',
  'high-contrast': '#ffffff',
};
