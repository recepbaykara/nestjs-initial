import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(createUserInput: CreateUserInput) {
    const { email, password } = createUserInput;
    const user = this.repo.create({ email, password });
    const savedUser = await this.repo.save(user);
    console.log(savedUser);
    return savedUser;
  }

  async findAll() {
    const users = await this.repo.find();
    console.log(users)
    return users;
  }

  async findOne(id: number) {
    return await this.repo.findOne({where : {id}});
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const {email, password} = updateUserInput;
    const user = await this.repo.findOne({where : {id}});
    const updatedUser = await this.repo.update(user, {email, password});
    console.log(updatedUser);
    return updatedUser;
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
