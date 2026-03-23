import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main>{children}</main>
  </div>
);
