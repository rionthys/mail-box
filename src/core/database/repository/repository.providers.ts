import { DATABASE_REQUEST } from '../../../common/constants';
import { RequestRepository } from './request.repository';

export const repositoryProviders = [
  {
    provide: DATABASE_REQUEST,
    useClass: RequestRepository,
  },
];
