import React, { useState, useEffect } from 'react';
import { Avatar, Mono } from './UI';
import { useElections } from '../hooks/useElections';
import { castVote, hasVoted } from '../api/vote';

export default function Vote({ setPage, onSuccess, authed }) {
  const { elections, loading } = useElections('OPEN');
  const [elIdx, setElIdx]       = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [checkingVote, setCheckingVote] = useState(false);

  const el = elections[elIdx];

  // When election changes, check if already voted
  useEffect(() => {
    if (!el || !authed) return;
    setCheckingVote(true);
    hasVoted(el.id)
      .then(v => setAlreadyVoted(v))
      .catch(() => setAlreadyVoted(false))
      .finally(() => setCheckingVote(false));
    setSelected(null);
    setError('');
  }, [el?.id, authed]);

  const submit = async () => {
    if (!authed) { setPage('login'); return; }
    if (!selected) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await castVote({ electionId: el.id, candidateId: selected });
      const cand = el.candidates.find(c => c.id === selected);
      onSuccess(`Vote Submitted! Your vote for ${cand.name} has been recorded securely. Thank you for participating.`);
      setAlreadyVoted(true);
      setSelected(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'100px 36px', textAlign:'center', color:'var(--muted)' }}>Loading elections…</div>
  );

  if (!elections.length) return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'100px 36px', textAlign:'center' }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', fontWeight:700, marginBottom:12 }}>No Open Elections</div>
      <div style={{ color:'var(--muted)', marginBottom:24 }}>There are no elections open for voting right now.</div>
      <button onClick={()=>setPage('elections')} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.72rem', color:'var(--bg)', background:'var(--gold)', border:'none', padding:'10px 22px', borderRadius:4, cursor:'pointer' }}>
        View All Elections
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'80px 36px', paddingTop:'100px' }}>
      <div className="anim" style={{ marginBottom:40, paddingBottom:28, borderBottom:'1px solid var(--border)' }}>
        <Mono style={{ fontSize:'0.66rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', display:'block', marginBottom:10 }}>Cast Your Vote</Mono>

        {/* Election tabs */}
        {elections.length > 1 && (
          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
            {elections.map((e, i) => (
              <button key={e.id} onClick={() => setElIdx(i)}
                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.66rem', letterSpacing:'0.08em', textTransform:'uppercase', color: elIdx===i ? 'var(--bg)' : 'var(--muted)', background: elIdx===i ? 'var(--gold)' : 'rgba(255,255,255,.04)', border:`1px solid ${elIdx===i ? 'var(--gold)' : 'rgba(237,234,226,.1)'}`, padding:'6px 14px', borderRadius:4, cursor:'pointer', transition:'all .18s' }}>
                Election {i+1}
              </button>
            ))}
          </div>
        )}

        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:700, marginBottom:6 }}>{el.title}</div>
        <Mono style={{ fontSize:'0.68rem', color:'rgba(237,234,226,.3)' }}>
          CLOSES {new Date(el.endDate).toLocaleDateString()} · SELECT ONE CANDIDATE · VOTE IS FINAL
        </Mono>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background:'rgba(232,102,90,.1)', border:'1px solid rgba(232,102,90,.3)', borderRadius:4, padding:'10px 14px', marginBottom:20, fontSize:'0.82rem', color:'#e8665a' }}>
          {error}
        </div>
      )}

      {/* Not logged in warning */}
      {!authed && (
        <div style={{ background:'rgba(255,214,90,.07)', border:'1px solid rgba(255,214,90,.2)', borderRadius:4, padding:'12px 16px', marginBottom:20, fontSize:'0.82rem', color:'var(--gold)' }}>
          You must <span onClick={()=>setPage('login')} style={{ textDecoration:'underline', cursor:'pointer' }}>sign in</span> to cast a vote.
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
        {checkingVote ? (
          <div style={{ textAlign:'center', color:'var(--muted)', padding:20 }}>Checking vote status…</div>
        ) : (
          el.candidates?.map((c, i) => {
            const isSelected = selected === c.id;
            return (
              <div key={c.id} className={`anim anim-d${i+1}`}
                onClick={() => !alreadyVoted && setSelected(c.id)}
                style={{ background:'var(--surface)', borderRadius:7, border:`2px solid ${isSelected ? 'var(--gold)' : 'rgba(237,234,226,.07)'}`, padding:'20px 22px', display:'flex', alignItems:'center', gap:18, cursor: alreadyVoted ? 'default' : 'pointer', transition:'all .2s', transform: isSelected ? 'translateX(4px)' : 'none', position:'relative', overflow:'hidden' }}>
                {isSelected && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'var(--gold)' }} />}
                <Avatar initials={c.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()} color={['#ffd65a','#4ecb8d','#5a9fe8','#e8665a'][i % 4]} size={48} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', fontWeight:700, marginBottom:3 }}>{c.name}</div>
                  <div style={{ fontSize:'0.76rem', color:'var(--muted)' }}>{c.party}</div>
                </div>
                <div style={{ width:22, height:22, borderRadius:'50%', border:`2px solid ${isSelected ? 'var(--gold)' : 'rgba(237,234,226,.2)'}`, background: isSelected ? 'var(--gold)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}>
                  {isSelected && <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--bg)' }} />}
                </div>
              </div>
            );
          })
        )}
      </div>

      {alreadyVoted ? (
        <div style={{ background:'rgba(78,203,141,.08)', border:'1px solid rgba(78,203,141,.25)', borderRadius:6, padding:'16px 20px', textAlign:'center', fontSize:'0.85rem', color:'var(--green)' }}>
          ✓ You have already voted in this election
        </div>
      ) : (
        <button onClick={submit} disabled={!selected || submitting || !authed}
          style={{ width:'100%', fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--bg)', background: selected&&authed ? 'var(--gold)' : 'rgba(255,214,90,.25)', border:'none', padding:16, borderRadius:4, cursor: selected&&authed ? 'pointer' : 'not-allowed', transition:'all .22s', opacity: selected&&authed ? 1 : 0.55 }}>
          {submitting ? 'Submitting…' : 'Confirm & Submit Vote'}
        </button>
      )}
    </div>
  );
}
