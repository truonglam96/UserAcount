// Uncomment these imports to begin using these cool features!

import { authenticate } from '@loopback/authentication';
import { AuthorizationDecision, AuthorizationOptions, authorize } from '@loopback/authorization';
import { Filter, repository } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, requestBody } from '@loopback/rest';
import {User} from '../models';
import {UsersRepository} from '../repositories';
// import {inject} from '@loopback/core';

@authenticate('jwt')
export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) {}

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.usersRepository.find(filter);
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(User, {includeRelations: true})}},
      },
    },
  })

  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['userId'],
          }),
        },
      },
    })
    user: Omit<User, 'userId'>,
  ): 
  Promise<User> {
    return this.usersRepository.create(user);
  }

  @patch('/products/{id}', {
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.usersRepository.updateById(id, user);
  }

  @del('/user/{id}', {
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
