import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';

import './styles.css';
import api from '../../services/api';

interface INotification {
  id: string;
  title: string;
  description: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { user_id } = useParams();

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('/notification', {
        headers: {
          user: user_id,
        },
      });

      setNotifications(response.data);
    }

    loadNotifications();
  }, [user_id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: {
        user: user_id,
      },
    });

    socket.on('notification', (notification: INotification) => {
      setNotifications(state => [notification, ...state]);
    });
  }, [user_id]);

  return (
    <div className="notifications-page-container">
      <header className="page-header">
        <div className="header-content">
          <Link to="/">Voltar</Link>
        </div>
      </header>
      <div className="page-content">
        <div className="notifications-container">
          <h2>Suas notificações</h2>
          {notifications.length === 0 && (
            <p className="no-notifications-message">
              Você ainda não tem nenhuma notificação
            </p>
          )}
          {notifications.map(notification => (
            <div key={notification.id} className="notification">
              <strong>{notification.title}</strong>
              <p>{notification.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
