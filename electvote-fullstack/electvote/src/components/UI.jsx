import React, { useState } from 'react';

export function Mono({ children, style = {} }) {
  return (
    <span style={{ fontFamily: "'IBM Plex Mono', monospace", ...style }}>
      {children}
    </span>
  );
}

export function Badge({ status }) {
  const cfg = {
    open:     { bg: 'rgba(78,203,141,.12)',  color: '#4ecb8d', border: 'rgba(78,203,141,.25)',  label: 'Open'     },
    closed:   { bg: 'rgba(120,120,120,.1)',  color: 'rgba(237,234,226,.32)', border: 'rgba(120,120,120,.18)', label: 'Closed' },
    upcoming: { bg: 'rgba(255,214,90,.08)', color: '#ffd65a', border: 'rgba(255,214,90,.2)',   label: 'Upcoming' },
  }[status] || {};

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '3px 11px', borderRadius: 20,
    }}>
      {status === 'open' && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: '#4ecb8d',
          animation: 'pulseDot 1.5s infinite', display: 'inline-block',
        }} />
      )}
      {cfg.label}
    </span>
  );
}

export function Avatar({ initials, color, size = 42 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}18`, border: `2px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
      fontSize: size * 0.28, color, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export function GoldLine() {
  return (
    <div style={{
      height: 3,
      background: 'linear-gradient(90deg, var(--gold), var(--gold2), var(--gold))',
      borderRadius: '3px 3px 0 0',
      position: 'absolute', top: 0, left: 0, right: 0,
    }} />
  );
}

export function Card({ children, style = {}, onClick, className = '' }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hov && onClick ? 'rgba(255,214,90,.4)' : 'var(--border)'}`,
        borderRadius: 'var(--r)',
        position: 'relative', overflow: 'hidden',
        transition: 'all .22s',
        transform: hov && onClick ? 'translateY(-3px)' : 'none',
        boxShadow: hov && onClick ? '0 20px 60px rgba(0,0,0,.5)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function BtnPrimary({ children, onClick, disabled = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.76rem',
        fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--bg)', background: disabled ? 'rgba(255,214,90,.3)' : 'var(--gold)',
        border: 'none', padding: '13px 28px', borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'background .2s',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function FormField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Mono style={{
        display: 'block', fontSize: '0.62rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 7,
      }}>
        {label}
      </Mono>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(237,234,226,.1)', borderRadius: 4,
          color: 'var(--text)', fontFamily: "'Outfit', sans-serif",
          fontSize: '0.9rem', padding: '11px 14px', outline: 'none',
        }}
      />
    </div>
  );
}
