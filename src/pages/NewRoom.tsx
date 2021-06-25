import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '')
      return;

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`);

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />

          <h2>Criar una nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da Sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente?<Link to="/" >Clique aqui </Link></p>

        </div>
      </main>
    </div>
  )
}