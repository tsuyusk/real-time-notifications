import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import { useRef } from 'react';

interface ICreateUserResponse {
  name: string;
  id: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      const response = await api.post<ICreateUserResponse>('/user', {
        name: inputRef.current?.value,
      });

      history.push(`/notifications/${response.data.id}`);
    } catch (error) {
      alert('Algo deu errado, tente novamente');
    }
  }

  return (
    <div className="homepage-container">
      <div className="register-page-content">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-block">
            <label htmlFor="name-input">Nome</label>
            <input ref={inputRef} type="text" id="name-input" required />
          </div>
          <button className="register-button">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
