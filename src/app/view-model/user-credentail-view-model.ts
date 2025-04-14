import { prop, propObject, propArray, required, maxLength, range, email } from "@rxweb/reactive-form-validators"

export class UserCredentialViewModel {


  @prop()
  @email()
  @required()
  email: string;

  @prop()
  password: string;

  @prop()
  isAdmin = true;

}

export class UserForgotPasswordViewModel {


  @prop()
  @email()
  @required()
  email: string;

  @prop()
  @required()
  password: string;

  @prop()
  @required()
  confirmPassword: string;

  @prop()
  verificationCode: string;

  @prop()
  userId: number;

}
