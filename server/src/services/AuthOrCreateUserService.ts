import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';

interface IRequest {
  name: string;
}

export default class CreateUserService {
  public async execute({ name }: IRequest) {
    const usersRepository = getMongoRepository(User);

    const userWithSameName = await usersRepository.findOne({
      where: { name },
    });

    if (userWithSameName) {
      return userWithSameName;
    }

    const user = usersRepository.create({
      name,
    });

    await usersRepository.save(user);

    return user;
  }
}
