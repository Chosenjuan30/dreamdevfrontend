import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Card, GoldLine, Mono } from './UI';
import { useElections } from '../hooks/useElections';
import { useResults } from '../hooks/useResults';

function ResultBar({ pct, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 250); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height:6, background:'rgba(237,234,226,.06)', borderRadius:3, overflow:'hidden', flex:1 }}>
      <div style={{ height:'100%', width:`${w}%`, background:color, borderRadius:3, transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
    </div>
  );
}

export default function Results() {
  const { elections, loading: eLoading } = useElections();
  const electionIds = elections.filter(e => e.status !== 'UPCOMING').map(e => e.id);
  const { results, loading: rLoading } = useResults(electionIds, 30000);

  const loading = eLoading || rLoading;

  if (loading) return (
    <div style={{ maxWidth:820, margin:'0 auto', padding:'100px 36px', textAlign:'center', color:'var(--muted)' }}>
      Loading results…
    </div>
  );

  return (
    <div style={{ maxWidth:820, margin:'0 auto', padding:'80px 36px', paddingTop:'100px' }}>
      <div className="anim" style={{ marginBottom:44 }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <span style={{ width:28, height:1, background:'var(--gold)', display:'inline-block' }} />Election Results
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700 }}>
          Live <em style={{ color:'var(--gold)' }}>Tallies</em>
        </h2>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.65rem', color:'rgba(237,234,226,.25)', marginTop:8 }}>
          Auto-refreshes every 30 seconds
        </div>
      </div>

      {elections.filter(e => e.status !== 'UPCOMING').map((el, i) => {
        const result = results[el.id];
        const sorted = result?.results || [];
        const total  = result?.totalVotes || 0;

        return (
          <Card key={el.id} className={`anim anim-d${i+1}`} style={{ padding:28, marginBottom:20 }}>
            {i===0 && <GoldLine />}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22, paddingBottom:18, borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', fontWeight:700, flex:1 }}>{el.title}</div>
              <Badge status={el.status.toLowerCase()} />
              <Mono style={{ fontSize:'0.65rem', color:'var(--muted)' }}>{total} votes</Mono>
            </div>

            {!result ? (
              <div style={{ color:'var(--muted)', fontSize:'0.84rem', padding:'8px 0' }}>No results yet.</div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                {sorted.map((c) => {
                  const colors = ['#ffd65a','#4ecb8d','#5a9fe8','#e8665a'];
                  const color  = colors[(c.rank - 1) % colors.length];
                  return (
                    <div key={c.candidateId} style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', fontWeight:900, color: c.rank===1 ? 'var(--gold)' : 'rgba(237,234,226,.12)', width:26, flexShrink:0 }}>{c.rank}</div>
                      <Avatar initials={c.candidateName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()} color={color} size={40} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'0.88rem', fontWeight:500, marginBottom:7 }}>{c.candidateName}</div>
                        <ResultBar pct={c.percentage} color={color} />
                      </div>
                      <div style={{ textAlign:'right', minWidth:70 }}>
                        <Mono style={{ fontSize:'1rem', fontWeight:600, color }}>{c.percentage}%</Mono>
                        <div style={{ fontSize:'0.68rem', color:'rgba(237,234,226,.28)', marginTop:2 }}>{c.votes.toLocaleString()} votes</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
