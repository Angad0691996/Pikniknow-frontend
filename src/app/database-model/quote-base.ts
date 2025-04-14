import { prop, propObject, propArray, required, maxLength, range, numeric } from "@rxweb/reactive-form-validators"


export class QuoteBase {

  //#region quoteId Prop
  @prop()
  quoteId: number;
  //#endregion quoteId Prop


  //#region specialityId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647, message:"Please select speciality" })
  @required()
  specialityId: number;
  //#endregion specialityId Prop


  //#region budget Prop
  @required()
  @numeric()
  budget: number;
  //#endregion budget Prop


  //#region createdById Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  createdById: number;
  //#endregion createdById Prop


  //#region createdByDate Prop
  @required()
  createdByDate: Date;
  //#endregion createdByDate Prop


  //#region statusId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  statusId: number;
  //#endregion statusId Prop

}
