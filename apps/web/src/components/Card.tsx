export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #334155',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
      }}
    >
      {children}
    </div>
  );
}