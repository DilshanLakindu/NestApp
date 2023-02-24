import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

//Define the metadata key
export const ROLES_KEY = 'roles';
//Define the decorator for set metadata
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
