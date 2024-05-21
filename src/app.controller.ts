import { Controller, Get, Inject } from '@nestjs/common';
import { USERS_SERVICE } from './common/constants';
import { IUsersService } from './modules/users/interfaces/users.interface';

@Controller()
export class AppController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    await this.usersService.update(
      { username: 'pedro' },
      {
        username: 'pedro Update',
        password: 'hehe',
        email: 'pedro@gmail.com',
      },
    );

    return this.usersService.findOne({ username: 'pedro Update' });
  }
}
