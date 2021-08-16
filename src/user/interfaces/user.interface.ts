export default interface IUser {
  id: string;

  name: string;
  login: string;
  password: string;

  refreshToken?: string;
}
