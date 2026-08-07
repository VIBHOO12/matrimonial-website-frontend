import { RegistrationInfo } from "./registrationInfo";
export interface UserInfo {
  id?: number;
  registration: RegistrationInfo;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
}