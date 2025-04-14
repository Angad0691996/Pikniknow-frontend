import { prop, required, maxLength, propArray } from '@rxweb/reactive-form-validators';

export class StoryMedia {
  @prop()
  storyMediaId: number;

  @prop()
  storyId: number;

  @prop()
  fileTypeId: number;

  @prop()
  filePath: string;

  @prop()
  isPrimaryMedia: boolean;

  @prop()
  statusId: number;
}

export class StoryTags {

  @prop()
  storyTagId: number;

  @prop()
  tagId: number;

  @prop()
  storyId: number;

  @prop()
  statusId: number;
}

export class Story {

  @propArray(StoryMedia)
  storyMedias: StoryMedia[];

  @propArray(StoryTags)
  storyTags: StoryTags[];

  @prop()
  storyId: number;

  @prop()
  @required()
  title: string;

  @prop()
  latitude: string;

  @prop()
  longitude: string;

  @prop()
  @required()
  @maxLength({ value: 1000 })
  spotInformation: string;

  @prop()
  createdByDate: Date;

  @prop()
  createdById: string;

  @prop()
  modifiedById: string;

  @prop()
  modifiedByDate: Date;

  @prop()
  statusId: number;

  @prop()
  totalLike: number;

  @prop()
  totalShare: number;

  @prop()
  totalView: number;

  @prop()
  city: string;

  @prop()
  state: string;

  @prop()
  country: string;

  @prop()
  @required()
  postalCode: string;

  @prop()
  addressLine1: string;

  @prop()
  addressLine2: string;

  @prop()
  @required()
  @maxLength({ value: 50 })
  locationName

  @prop()
  @required()
  metaDescription

}
