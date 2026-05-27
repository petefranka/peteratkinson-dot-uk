import { themes, ThemeId } from './colourThemes';

interface Props {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
}

export default function MobileColourThemeToggle({ value, onChange }: Props) {
  return (
    <select
      data-testid="mobile-colour-theme-toggle"
      aria-label="Colour vision profile"
      value={value}
      onChange={(e) => onChange(e.target.value as ThemeId)}
      className="sm:hidden w-full text-base rounded-lg px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-matte)] text-[var(--text-body)] focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]"
    >
      {themes.map(({ id, label }) => (
        <option key={id} value={id}>{label}</option>
      ))}
    </select>
  );
}
