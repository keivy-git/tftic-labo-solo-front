export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export type UserType = 'organizer' | 'secondHandDealer';

export interface IUserTypeDetails {
  type: UserType;
  message: string;
  form: any;
}
