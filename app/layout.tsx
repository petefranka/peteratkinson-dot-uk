import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Peter Atkinson - Staff Engineer',
  description: 'Engineer from Yorkshire, building reliable systems and web experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
