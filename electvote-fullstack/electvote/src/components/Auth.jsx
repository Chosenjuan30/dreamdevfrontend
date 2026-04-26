import React, { useState } from 'react';
import { Card, GoldLine, Mono } from './UI';
import { login, register } from '../api/auth';

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,.03)',
  border: '1px solid rgba(237,234,226,.1)', borderRadius: 4,
  color: 'var(--text)', fontFamily: "'Outfit', sans-serif",
  fontSize: '0.9rem', padding: '11px 14px', outline: 'none',
};

const btnStyle = {
  width: '100%', fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--gold)',
  border: 'none', padding: 13, borderRadius: 4, cursor: 'pointer', marginTop: 6,
};

function ErrorBanner({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ background: 'rgba(232,102,90,.1)', border: '1px solid rgba(232,102,90,.3)', borderRadius: 4, padding: '10px 14px', marginBottom: 18, fontSize: '0.82rem', color: '#e8665a' }}>
      {msg}
    </div>
  );
}

export function Login({ setPage, onSuccess, onSignIn }) {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res = await login(form);
      onSignIn(res.data);
      onSuccess('Signed In! Welcome back. You are now logged in and can participate in open elections.');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', paddingTop: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ padding: 44, width: '100%', maxWidth: 420 }}>
        <GoldLine />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.55rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>ElectVote</div>
        <div style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: 32 }}>Sign in to participate in elections</div>
        <ErrorBanner msg={error} />
        {[['Email','email','email','adaeze@university.edu'],['Password','password','password','••••••••']].map(([lbl,key,type,ph]) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <Mono style={{ display:'block', fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:7 }}>{lbl}</Mono>
            <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} style={inputStyle} />
          </div>
        ))}
        <button onClick={handleSubmit} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <div style={{ textAlign:'center', marginTop:20, fontSize:'0.8rem', color:'var(--muted)' }}>
          No account? <span onClick={()=>setPage('register')} style={{ color:'var(--gold)', cursor:'pointer' }}>Register now</span>
        </div>
      </Card>
    </div>
  );
}

export function Register({ setPage, onSuccess }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'', confirmPassword:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async () => {
    setError('');
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (!firstName||!lastName||!email||!password||!confirmPassword) { setError('Please fill in all fields.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await register(form);
      onSuccess('Account Created! Your voter account has been created. You can now sign in and cast your votes.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'calc(100vh - 60px)', paddingTop:60, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Card style={{ padding:44, width:'100%', maxWidth:480 }}>
        <GoldLine />
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.55rem', fontWeight:700, color:'var(--gold)', marginBottom:6 }}>ElectVote</div>
        <div style={{ fontSize:'0.83rem', color:'var(--muted)', marginBottom:32 }}>Create your voter account</div>
        <ErrorBanner msg={error} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:0 }}>
          {[['First Name','firstName','Adaeze'],['Last Name','lastName','Okonkwo']].map(([lbl,key,ph])=>(
            <div key={key}>
              <Mono style={{ display:'block', fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:7 }}>{lbl}</Mono>
              <input type="text" placeholder={ph} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{ ...inputStyle, marginBottom:16 }} />
            </div>
          ))}
        </div>
        {[['Email','email','email','adaeze@university.edu'],['Password','password','password','Min. 8 characters'],['Confirm Password','confirmPassword','password','Repeat password']].map(([lbl,key,type,ph])=>(
          <div key={key} style={{ marginBottom:16 }}>
            <Mono style={{ display:'block', fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:7 }}>{lbl}</Mono>
            <input type={type} placeholder={ph} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={inputStyle} />
          </div>
        ))}
        <button onClick={handleSubmit} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
        <div style={{ textAlign:'center', marginTop:20, fontSize:'0.8rem', color:'var(--muted)' }}>
          Already have an account? <span onClick={()=>setPage('login')} style={{ color:'var(--gold)', cursor:'pointer' }}>Sign in</span>
        </div>
      </Card>
    </div>
  );
}
