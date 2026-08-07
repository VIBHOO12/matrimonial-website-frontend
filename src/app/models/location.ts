import { RegistrationInfo } from "./registrationInfo";
export class Location {
    id?: number;
    name!: string;
    email!: string;
    location!: string;
    date!: string;
    time!: string;
    registration!: RegistrationInfo;
  }