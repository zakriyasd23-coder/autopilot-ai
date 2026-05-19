import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Header() {
  const { isAuthed, login, logout } = useAuth();

  return (
    <div
      style={{
        padding: '20px',
        borderBottom: '1px solid #334155',
        display: 'flex',
        gap: '20px',
        background: '#0f172a',
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/accounts">Accounts</Link>

      {isAuthed ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}