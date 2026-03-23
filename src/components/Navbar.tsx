import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/results', label: 'Flights' },
  { to: '/profile', label: 'My Bookings' },
];

export const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-white/60 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <NavLink to="/" className="text-xl font-bold tracking-tight text-brand-700">
        SkyBooker
      </NavLink>
      <nav className="flex items-center gap-2 sm:gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);
