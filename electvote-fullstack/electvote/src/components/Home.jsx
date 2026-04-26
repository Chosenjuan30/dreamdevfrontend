import React from 'react';
import { ELECTIONS } from '../data';
import { Avatar, Badge, Card, GoldLine, Mono } from './UI';

export default function Home({ setPage }) {
  const el = ELECTIONS[0];
  const total = el.candidates.reduce((s, c) => s + c.votes, 0);

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', paddingTop: 60 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: 56, padding: '60px 48px',
        minHeight: 'calc(100vh - 60px)', position: 'relative',
      }}>
        {/* BG glow */}
        <div style={{
          position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,214,90,.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Left */}
        <div>
          <div className="anim" style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 18,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 36, height: 1, background: 'var(--gold)' }} />
            BootCamp 2.0 — Election Platform
          </div>

          <h1 className="anim anim-d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem,5vw,5.2rem)', fontWeight: 700,
            lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 22,
          }}>
            Your Voice.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Your Vote.</em><br />
            Your Future.
          </h1>

          <p className="anim anim-d2" style={{
            fontSize: '1rem', lineHeight: 1.72, color: 'var(--muted)',
            maxWidth: 460, marginBottom: 36,
          }}>
            A secure, transparent digital voting platform for the modern era.
            Participate in elections, track results in real time, and make your voice count.
          </p>

          <div className="anim anim-d3" style={{ display: 'flex', gap: 14 }}>
            <button onClick={() => setPage('register')} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.74rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--bg)', background: 'var(--gold)', border: 'none',
              padding: '13px 30px', borderRadius: 4, cursor: 'pointer',
            }}>
              Register to Vote
            </button>
            <button onClick={() => setPage('elections')} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.74rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--text)', background: 'transparent',
              border: '1px solid rgba(237,234,226,.18)',
              padding: '13px 30px', borderRadius: 4, cursor: 'pointer',
            }}>
              View Elections
            </button>
          </div>

          <div className="anim anim-d4" style={{
            display: 'flex', gap: 40, marginTop: 52,
            paddingTop: 36, borderTop: '1px solid var(--border)',
          }}>
            {[['4', 'Active Elections'], ['1,284', 'Registered Voters'], ['98.7%', 'Uptime']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(237,234,226,.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hero Card */}
        <Card className="anim anim-d2" style={{ padding: 28 }}>
          <GoldLine />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Mono style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Featured Election
            </Mono>
            <Badge status="open" />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
            {el.title}
          </div>
          <Mono style={{ fontSize: '0.68rem', color: 'var(--muted)', display: 'block', marginBottom: 24 }}>
            CLOSES · {el.closes} · 11:59 PM
          </Mono>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {el.candidates.map(c => {
              const pct = Math.round((c.votes / total) * 100);
              return (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={c.initials} color={c.color} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 500, marginBottom: 5 }}>{c.name}</div>
                    <div style={{ height: 4, background: 'rgba(237,234,226,.07)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: c.color, borderRadius: 2 }} />
                    </div>
                  </div>
                  <Mono style={{ fontSize: '0.74rem', color: 'var(--muted)', minWidth: 34, textAlign: 'right' }}>{pct}%</Mono>
                </div>
              );
            })}
          </div>
          <button onClick={() => setPage('vote')} style={{
            width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.74rem',
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--bg)', background: 'var(--gold)', border: 'none',
            padding: 13, borderRadius: 4, cursor: 'pointer',
          }}>
            Cast Your Vote →
          </button>
        </Card>
      </div>
    </div>
  );
}
