/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from './granted-authority';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  id?: number;
  lastName?: string;
  name?: string;
  password?: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
  telephone?: string;
  username?: string;
}
