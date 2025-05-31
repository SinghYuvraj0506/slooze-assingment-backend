export interface UserFromJwt {
  id: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  country: 'INDIA' | 'AMERICA';
  status: 0 | 1;
}
