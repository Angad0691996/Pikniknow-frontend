import { required, prop, maxLength } from '@rxweb/reactive-form-validators';

export class PageViewModel {

  @prop()
  pageId: number = 0;


  @prop()
  @required()
  @maxLength({ value: 500 })
  heading: string;

  @prop()
  @required()
  @maxLength({ value: 100 })
  title: string;

  @prop()
  @required()
  description: string;

  @prop()
  @required()
  statusId: number;

  @prop()
  @required()
  pageLocationId: number;

  @prop()
  createdById: number;
  //
  @prop()
  createdByDate: string;

  @prop()
  modifiedByDate: Date;

  @prop()
  modifiedById: number = 0;
}
