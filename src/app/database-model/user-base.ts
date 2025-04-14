import { prop, propObject, propArray, required, maxLength, range, email, password, compare, numeric, trim, minLength } from "@rxweb/reactive-form-validators"


export class UserBase {

  @prop()
  userId: number;

  @prop()
  @required()
  @trim()
  userName: string;

  @prop()
  @required()
  roleId: number;

  @prop()
  @required()
  @minLength({ value: 10, message: "Invalid mobile number" })
  @maxLength({ value: 10, message: "Invalid mobile number" })
  mobileNumber: string;

  @prop()
  profilePicturePath: string;

  @required()
  @email()
  @prop()
  emailId: string;

  @prop()
  createdByDate: string;

  @prop()
  modifiedById: number;

  @prop()
  modifiedByDate: Date;

  @prop()
  createdById: number;

  @prop()
  statusId: number;

  @prop()
  salt

  @prop()
  password

  @prop()
  sessionId

  @prop()
  isNotificationEnable

  @prop()
  otpCode

  @prop()
  state

  @prop()
  city

  @prop()
  longitude

  @prop()
  latitude

  @prop()
  bio
}


export class UserChangePasswordBase {

  @prop()
  userId: number;

  @prop()
  @trim()
  userName: string;

  @prop()
  roleId: number;

  @prop()
  mobileNumber: string;

  @prop()
  profilePicturePath: string;

  @prop()
  emailId: string;

  @prop()
  createdByDate: string;

  @prop()
  modifiedById: number;

  @prop()
  modifiedByDate: Date;

  @prop()
  createdById: number;

  @prop()
  statusId: number;

  @prop()
  salt

  @prop()
  password

  @prop()
  sessionId

  @prop()
  isNotificationEnable

  @prop()
  otpCode

  @prop()
  state

  @prop()
  city

  @prop()
  longitude

  @prop()
  latitude

  @prop()
  bio

  @prop()
  isChangePassword: boolean = true;

  @prop()
  @required()
  oldPassword: string;

  @prop()
  @required()
  newPassword: string;

  @prop()
  @required()
  confirmPassword: string;
}
