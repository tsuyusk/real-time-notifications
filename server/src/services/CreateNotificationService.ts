import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import Notification from '../schemas/Notification';

interface IRequest {
  title: string;
  description: string;
  target_id: string | undefined;
  target_name: string | undefined;
}

export default class CreateNotificationService {
  public async execute({
    title,
    description,
    target_id,
    target_name,
  }: IRequest) {
    const usersRepository = getMongoRepository(User);
    const notificationsRepository = getMongoRepository(Notification);

    if (target_id && target_name) {
      throw new Error('Missing target identifiers');
    }

    const target = await usersRepository.findOne({
      where: {
        ...(target_id ? { id: target_id } : {}),
        ...(target_name ? { name: target_name } : {}),
      },
    });

    if (!target) {
      throw new Error('Target not found');
    }

    const notification = notificationsRepository.create({
      title,
      description,
      target_id: String(target.id),
    });

    await notificationsRepository.save(notification);

    return notification;
  }
}
