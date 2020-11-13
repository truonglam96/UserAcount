import {DefaultCrudRepository} from '@loopback/repository';
import {User, UsersRelations} from '../models';
import {UsersDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id,
  UsersRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(User, dataSource);
  }
}
