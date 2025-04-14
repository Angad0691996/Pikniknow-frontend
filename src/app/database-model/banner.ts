import { required, prop, maxLength, numeric,url } from '@rxweb/reactive-form-validators';

export class BannerViewModel {

  @prop()
  bannerId: number;

  @required()
  @prop()
  @maxLength({ value: 100 })
  name: string;

  @required()
  @prop()
  metaDescription: string;

  @required()
  @prop()
  statusId: number;

  @required()
  @prop()
  @numeric()
  orderId: number;

  @required()
  @prop()
  createdById: number;

  @required()
  @prop()
  createdByDate: string;

  @prop()
  modifiedByDate: string;

  @prop()
  modifiedById: number;

  @prop()
  bannerImage: File;

  @prop()
  @required()
  imageURL: string;

  @prop()
  baseData: string;

  @prop()
  imageType: string;

  @prop()
  @url()
  redirectURL: string;
}
