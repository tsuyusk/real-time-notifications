import { Router, response } from 'express';
import CreateNotificationService from '../services/CreateNotificationService';
import ListNotificationsService from '../services/ListNotificationsService';

const notificationRouter = Router();

notificationRouter.post('/', async (request, response) => {
  try {
    interface IRequestBody {
      title: string;
      description: string;
      target_id: string | undefined;
      target_name: string | undefined;
    }

    const {
      title,
      description,
      target_id,
      target_name,
    } = request.body as IRequestBody;

    const createNotification = new CreateNotificationService();

    const notification = await createNotification.execute({
      title,
      description,
      target_id,
      target_name,
    });

    const targetSocket = request.connectedUsers[notification.target_id];

    request.io.to(targetSocket).emit('notification', notification);

    return response.json(notification);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

notificationRouter.get('/', async (request, response) => {
  try {
    const { user } = request.headers;

    if (!user) {
      throw new Error('Missing user id');
    }

    const target_id = String(user);

    const listNotifications = new ListNotificationsService();

    const notifications = await listNotifications.execute({ target_id });

    return response.json(notifications);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default notificationRouter;
