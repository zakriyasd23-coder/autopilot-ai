import { ReactNode } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        {children}
      </main>
    </div>
  );
}