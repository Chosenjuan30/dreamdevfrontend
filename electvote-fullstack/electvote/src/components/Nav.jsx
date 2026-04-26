import React from 'react';

const LINKS = [
  { id:'home',      label:'Home'      },
  { id:'elections', label:'Elections' },
  { id:'vote',      label:'Cast Vote' },
  { id:'results',   label:'Results'   },
  { id:'admin',     label:'Admin'     },
];

export default function Nav({ page, setPage, user, authed, onSignOut }) {
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, height:60, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 36px', background:'rgba(7,8,13,.93)', backdropFilter:'blur(14px)', borderBottom:'1px solid var(--border)' }}>
      <button onClick={() => setPage('home')} style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:'1.2rem', color:'var(--gold)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:9 }}>
        <span style={{ width:8, height:8, background:'var(--gold)', borderRadius:'50%', animation:'pulseDot 2s infinite', display:'inline-block' }} />
        ElectVote
      </button>

      <div style={{ display:'flex', gap:2 }}>
        {LINKS.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)}
            style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color: page===l.id ? 'var(--gold)' : 'var(--muted)', background: page===l.id ? 'rgba(255,214,90,.07)' : 'none', border:'none', padding:'7px 14px', borderRadius:4, cursor:'pointer', transition:'all .18s' }}>
            {l.label}
          </button>
        ))}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        {authed && user ? (
          <>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', color:'var(--muted)' }}>
              {user.firstName} {user.lastName}
            </span>
            <button onClick={onSignOut} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text)', background:'rgba(255,255,255,.06)', border:'1px solid rgba(237,234,226,.1)', padding:'9px 18px', borderRadius:4, cursor:'pointer' }}>
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => setPage('login')} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--bg)', background:'var(--gold)', border:'none', padding:'9px 20px', borderRadius:4, cursor:'pointer' }}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
