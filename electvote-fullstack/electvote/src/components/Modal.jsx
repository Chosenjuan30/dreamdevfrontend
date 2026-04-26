import React from 'react';

export default function Modal({ msg, onClose, setPage }) {
  if (!msg) return null;
  const [title, ...rest] = msg.split('! ');

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(7,8,13,.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, animation: 'fadeIn .25s ease',
      }}
    >
      <div style={{
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 8, padding: 44, maxWidth: 420, width: '90%',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        animation: 'fadeUp .3s ease',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--gold), var(--gold2))',
        }} />
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'rgba(78,203,141,.12)', border: '2px solid rgba(78,203,141,.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', margin: '0 auto 20px',
        }}>✓</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: 10 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 28 }}>
          {rest.join('! ')}
        </div>
        <button
          onClick={() => { onClose(); setPage('results'); }}
          style={{
            width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.76rem',
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--bg)', background: 'var(--gold)', border: 'none',
            padding: 13, borderRadius: 4, cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
