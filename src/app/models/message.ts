import { RegistrationInfo } from "./registrationInfo";

export class Message {
    id?: number;
    fromUsername!: string;
    toUsername!: string;
    message!: string;
    sentTime?: string;
    registrationInfo!: RegistrationInfo;
}
