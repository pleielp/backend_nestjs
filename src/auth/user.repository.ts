import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = this.create({ username, password: password });

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // '23505' is the error code for a unique constraint violation in PostgreSQL
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.findOne({ where: { username } });
  }
}
