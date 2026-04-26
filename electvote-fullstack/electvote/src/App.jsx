import React, { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import { Login, Register } from './components/Auth';
import Elections from './components/Elections';
import Vote from './components/Vote';
import Results from './components/Results';
import Admin from './components/Admin';
import Modal from './components/Modal';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [page, setPage]   = useState('home');
  const [modal, setModal] = useState(null);
  const { user, authed, signIn, signOut } = useAuth();

  const navTo = (p) => { setPage(p); window.scrollTo(0, 0); };

  const pages = {
    home:      <Home setPage={navTo} />,
    login:     <Login setPage={navTo} onSuccess={setModal} onSignIn={signIn} />,
    register:  <Register setPage={navTo} onSuccess={(msg) => { setModal(msg); navTo('login'); }} />,
    elections: <Elections setPage={navTo} authed={authed} />,
    vote:      <Vote setPage={navTo} onSuccess={setModal} authed={authed} />,
    results:   <Results />,
    admin:     <Admin />,
  };

  return (
    <div key={page}>
      <Nav page={page} setPage={navTo} user={user} authed={authed} onSignOut={() => { signOut(); navTo('home'); }} />
      {pages[page] || pages.home}
      <Modal msg={modal} onClose={() => setModal(null)} setPage={navTo} />
    </div>
  );
}
