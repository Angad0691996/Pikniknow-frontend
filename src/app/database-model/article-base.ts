import { prop, propObject, propArray, required, maxLength, range } from "@rxweb/reactive-form-validators"



export class ArticleBase {

  //#region articleId Prop
  @prop()
  articleId: number;
  //#endregion articleId Prop


  //#region name Prop
  @required()
  @maxLength({ value: 100 })
  name: string;
  //#endregion name Prop


  //#region description Prop
  @required()
  description: string;
  //#endregion description Prop


  //#region specialityId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  specialityId: number;
  //#endregion specialityId Prop


  //#region pharmaCompanyId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  pharmaCompanyId: number;
  //#endregion pharmaCompanyId Prop


  //#region fileUrl Prop
  @required()
  @maxLength({ value: 255 })
  fileUrl: string;
  //#endregion fileUrl Prop


  //#region createdById Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  createdById: number;
  //#endregion createdById Prop


  //#region createdByDate Prop
  @required()
  createdByDate: any;
  //#endregion createdByDate Prop


  //#region modifiedById Prop
  @prop()
  modifiedById: number;
  //#endregion modifiedById Prop


  //#region modifiedByDate Prop
  @prop()
  modifiedByDate: Date;
  //#endregion modifiedByDate Prop


  //#region statusId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  statusId: number;
  //#endregion statusId Prop

  @prop()
  formFile: File;



}
