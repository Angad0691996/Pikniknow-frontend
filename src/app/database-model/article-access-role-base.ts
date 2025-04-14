import { prop, propObject, propArray, required, maxLength, range } from "@rxweb/reactive-form-validators"

export class ArticleAccessRoleBase {

  //#region articleAccesId Prop
  @prop()
  articleAccesId: number;
  //#endregion articleAccesId Prop


  //#region userId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  userId: number;
  //#endregion userId Prop


  //#region articleId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  articleId: number;
  //#endregion articleId Prop

  @propArray()
  articleAccessRoleUserBase: ArticleAccessRoleUserBase[]

}

export class ArticleAccessRoleUserBase {
  //#region userId Prop
  @range({ minimumNumber: 1, maximumNumber: 2147483647 })
  @required()
  userId: number;

  @prop()
  emailId: string;
  //#endregion userId Prop
}
