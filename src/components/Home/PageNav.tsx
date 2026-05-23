const navItems = [
  { href: '#i-care-about', label: 'I care about' },
  { href: '#work', label: 'Work' },
  { href: '#about-me', label: 'About' },
  { href: '#my-thoughts', label: 'Thoughts' },
  { href: '#get-in-touch', label: 'Contact' },
];

export default function PageNav() {
  return (
    <nav aria-label="Page sections">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 site-body">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="site-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
