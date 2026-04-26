import React, { useState } from 'react';
import { ELECTIONS, VOTERS } from '../data';
import { Badge, Mono } from './UI';

const SIDE_LINKS = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'elections', label: 'Elections',  icon: '○' },
  { id: 'voters',    label: 'Voters',     icon: '◎' },
  { id: 'results',   label: 'Results',    icon: '◈' },
  { id: 'settings',  label: 'Settings',   icon: '⊙' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ paddingTop: 60, display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 60px)' }}>
      {/* Sidebar */}
      <aside style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '28px 0' }}>
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <Mono style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(237,234,226,.22)', display: 'block', marginBottom: 6 }}>
            Navigation
          </Mono>
        </div>
        {SIDE_LINKS.map(l => (
          <div key={l.id} onClick={() => setActiveTab(l.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 22px', fontSize: '0.84rem',
              color: activeTab === l.id ? 'var(--text)' : 'var(--muted)',
              background: activeTab === l.id ? 'rgba(255,214,90,.07)' : 'transparent',
              borderLeft: `2px solid ${activeTab === l.id ? 'var(--gold)' : 'transparent'}`,
              cursor: 'pointer', transition: 'all .18s',
            }}>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{l.icon}</span>
            {l.label}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ padding: 36, overflowY: 'auto' }}>
        <Mono style={{ fontSize: '0.64rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 10 }}>
          Admin Panel
        </Mono>
        <h2 className="anim" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, marginBottom: 28 }}>
          Dashboard <em style={{ color: 'var(--gold)' }}>Overview</em>
        </h2>

        {/* Stats */}
        <div className="anim anim-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 28 }}>
          {[
            { n: '4',     l: 'Active Elections',  c: 'var(--gold)',  top: '#ffd65a' },
            { n: '1,284', l: 'Registered Voters', c: 'var(--green)', top: '#4ecb8d' },
            { n: '3,102', l: 'Total Votes Cast',  c: 'var(--red)',   top: '#e8665a' },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 22, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.top }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(237,234,226,.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Elections table */}
        <div className="anim anim-d2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700 }}>Elections</div>
            <button style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--gold)', border: 'none', padding: '7px 16px', borderRadius: 3, cursor: 'pointer' }}>
              + New Election
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Election Name', 'Status', 'Candidates', 'Votes', 'Closes'].map(h => (
                  <th key={h} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(237,234,226,.28)', padding: '10px 22px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ELECTIONS.map(el => (
                <tr key={el.id} style={{ borderBottom: '1px solid rgba(237,234,226,.04)' }}>
                  <td style={{ padding: '12px 22px', fontSize: '0.84rem', color: 'rgba(237,234,226,.78)' }}>{el.title}</td>
                  <td style={{ padding: '12px 22px' }}><Badge status={el.status} /></td>
                  <td style={{ padding: '12px 22px', fontSize: '0.84rem', color: 'var(--muted)' }}>{el.candidates.length}</td>
                  <td style={{ padding: '12px 22px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.78rem', color: 'var(--muted)' }}>{el.candidates.reduce((s, c) => s + c.votes, 0) || '—'}</td>
                  <td style={{ padding: '12px 22px', fontSize: '0.78rem', color: 'rgba(237,234,226,.3)' }}>{el.closes || el.opens || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Voters table */}
        <div className="anim anim-d3" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700 }}>Recent Voters</div>
            <button style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--gold)', border: 'none', padding: '7px 16px', borderRadius: 3, cursor: 'pointer' }}>
              Export CSV
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Voter ID', 'Name', 'Election', 'Time'].map(h => (
                  <th key={h} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(237,234,226,.28)', padding: '10px 22px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VOTERS.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid rgba(237,234,226,.04)' }}>
                  <td style={{ padding: '12px 22px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.74rem', color: 'var(--gold)' }}>{v.id}</td>
                  <td style={{ padding: '12px 22px', fontSize: '0.84rem', color: 'rgba(237,234,226,.78)' }}>{v.name}</td>
                  <td style={{ padding: '12px 22px', fontSize: '0.8rem', color: 'var(--muted)' }}>{v.election}</td>
                  <td style={{ padding: '12px 22px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '0.74rem', color: 'rgba(237,234,226,.28)' }}>{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
