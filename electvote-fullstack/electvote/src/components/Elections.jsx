import React from 'react';
import { Badge, Card, Mono } from './UI';
import { useElections } from '../hooks/useElections';

function Skeleton() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:6, padding:26, height:180,
          backgroundImage:'linear-gradient(90deg,rgba(255,255,255,.02) 25%,rgba(255,255,255,.06) 50%,rgba(255,255,255,.02) 75%)',
          backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
      ))}
    </div>
  );
}

export default function Elections({ setPage, authed }) {
  const { elections, loading, error, refetch } = useElections();

  if (loading) return (
    <div style={{ padding:'80px 48px', paddingTop:'100px' }}>
      <div style={{ marginBottom:44 }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ width:28, height:1, background:'var(--gold)', display:'block' }} />All Elections
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700 }}>
          Active &amp; <em style={{ color:'var(--gold)' }}>Upcoming</em>
        </h2>
      </div>
      <Skeleton />
    </div>
  );

  if (error) return (
    <div style={{ padding:'100px 48px', textAlign:'center' }}>
      <div style={{ color:'#e8665a', marginBottom:16 }}>{error}</div>
      <button onClick={refetch} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.72rem', color:'var(--bg)', background:'var(--gold)', border:'none', padding:'10px 22px', borderRadius:4, cursor:'pointer' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding:'80px 48px', paddingTop:'100px' }}>
      <div style={{ marginBottom:44 }}>
        <div className="anim" style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ width:28, height:1, background:'var(--gold)', display:'block' }} />All Elections
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700 }}>
          Active &amp; <em style={{ color:'var(--gold)' }}>Upcoming</em>
        </h2>
      </div>

      {elections.length === 0 ? (
        <div style={{ textAlign:'center', color:'var(--muted)', paddingTop:60 }}>No elections found.</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
          {elections.map((el, i) => {
            const isClickable = el.status === 'OPEN' || el.status === 'CLOSED';
            return (
              <Card key={el.id} className={`anim anim-d${Math.min(i+1,5)}`}
                onClick={isClickable ? () => setPage(el.status === 'OPEN' ? 'vote' : 'results') : undefined}
                style={{ padding:26 }}>
                <div style={{ marginBottom:14 }}><Badge status={el.status.toLowerCase()} /></div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:700, marginBottom:7, lineHeight:1.3 }}>{el.title}</div>
                <Mono style={{ fontSize:'0.7rem', color:'rgba(237,234,226,.3)', display:'block', marginBottom:18 }}>
                  {el.status === 'UPCOMING' ? `OPENS ${new Date(el.startDate).toLocaleDateString()}` : `CLOSES ${new Date(el.endDate).toLocaleDateString()}`}
                </Mono>
                <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:'0.78rem', color:'var(--muted)', marginBottom:18 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  {el.candidates?.length || 0} Candidates
                  <span style={{ marginLeft:'auto', fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', color:'var(--muted)' }}>
                    {el.totalVotes} votes
                  </span>
                </div>
                <Mono style={{ fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color: el.status==='UPCOMING' ? 'rgba(237,234,226,.25)' : 'var(--gold)' }}>
                  {el.status==='OPEN' ? 'Cast Vote →' : el.status==='CLOSED' ? 'View Results →' : 'Not Yet Open'}
                </Mono>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
