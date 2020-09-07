import { getMongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';

interface IRequest {
  target_id: string;
}

export default class ListNotificationsService {
  public async execute({ target_id }: IRequest) {
    const notificationsRepository = getMongoRepository(Notification);

    const notifications = await notificationsRepository.find({
      where: { target_id },
    });

    return notifications;
  }
}
