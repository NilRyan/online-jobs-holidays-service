import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { Role } from '../entities/users/types';
import { User } from '../entities/users/User';

export class SeedUsers1590519635401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    const userRepository = getRepository(User);

    user.username = 'Heisenberg';
    user.name = 'Walter White';
    user.email = 'admin@admin.com';
    user.password = 'pass1';
    user.hashPassword();
    user.role = 'ADMIN' as Role;
    await userRepository.save(user);

    user = new User();
    user.username = 'Jesse';
    user.name = 'Jesse Pinkman';
    user.email = 'subscriber@subscriber.com';
    user.password = 'pass1';
    user.hashPassword();
    user.role = 'SUBSCRIBER' as Role;
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
