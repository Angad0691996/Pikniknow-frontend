import { prop, propObject, propArray, required, maxLength, range } from "@rxweb/reactive-form-validators"


export class ArticleCommentBase {

  //#region articleCommentId Prop
  @prop()
  articleCommentId: number;
  //#endregion articleCommentId Prop


  //#region articleId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  articleId: number;
  //#endregion articleId Prop


  //#region comment Prop
  @required()
  @maxLength({ value: 1000 })
  comment: string;
  //#endregion comment Prop


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

  @prop()
  fullName: string;

}

export class ArticleCommentEditBase {


  @prop()
  articleId: number;

  @propArray()
  articleCommentBase: ArticleCommentBase[]
}
