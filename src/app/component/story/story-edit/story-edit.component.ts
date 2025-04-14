import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/database-model/story';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {

  showComponent = false;
  subscription: Subscription;
  storyEditForm: RxFormGroup;
  storyId: number;
  lookups: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  storyTag: any[] = [];
  storyMedia: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];
  constructor(private rxFormBuilder: RxFormBuilder,
    private rxHttp: RxHttp,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
    });
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    this.subscription = this.rxHttp.lookup([
      { path: "story", propName: "story", params: [this.storyId] },
      { path: "Lookups", propName: "lookups" },
    ]).subscribe((response: APIResponseViewModel[]) => {
      this.lookups = JSON.parse(response["lookups"].response)
      this.lookups = this.lookups[0];
      this.storyEditForm = <RxFormGroup>this.rxFormBuilder.formGroup(Story, response["story"].response);
      this.storyTag = this.storyEditForm.value.storyTags;
      this.storyMedia = this.storyEditForm.value.storyMedias;
      this.showComponent = true;
    })
  }

  editStory() {
    this.storyEditForm.submitted = true;
    if (this.storyEditForm.valid) {
      let data = this.storyEditForm.toFormData();
      this.subscription = this.rxHttp.put({ path: "story", params: [this.storyId], body: data }).subscribe((data: APIResponseViewModel) => {
        this.notificationService.success("Story updated");
      })
    }
  }

  getStoryMedia(): FormArray {
    let storyMediaFormArray = this.storyEditForm.controls["storyMedias"] as FormArray;
    return storyMediaFormArray;
  }

  getStoryTags(): FormArray {
    let storyMediaFormArray = this.storyEditForm.controls["storyTags"] as FormArray;
    return storyMediaFormArray;
  }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTags(index: any): void {
    let storyMediaFormArray = this.storyEditForm.controls["storyTags"] as FormArray;
    storyMediaFormArray.at(index).patchValue({ statusId: 3 })
    this.storyTag.splice(index, 1)
  }

  removeMedia(index: any): void {
    let storyMediaFormArray = this.storyEditForm.controls["storyMedias"] as FormArray;
    storyMediaFormArray.at(index).patchValue({ statusId: 3 })
    this.storyMedia.splice(index, 1)
  }

  getTagName(tagId: number) {
    let tag = this.lookups.tags.find(x => x.TagId == tagId)
    if (tag) {
      return tag.Name;
    }
  }

}
