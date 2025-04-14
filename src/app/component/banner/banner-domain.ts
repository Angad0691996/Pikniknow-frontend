import { BannerViewModel } from 'src/app/database-model/banner';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

export class BannerDomain {
  banner: BannerViewModel;
  bannerFormGroup: RxFormGroup;
  showComponent: boolean = false;
  bannerList: any[] = [];
  subscription: Subscription[] = [];
  bannerId: number = 0;
  file: File;
  notificationService: NotificationService;
  fileName: string;
  constructor() {

  }

  getFileDetails(e) {
    if (!this.validateFile(e.target.files[0].name)) {
      this.notificationService.error("Only png, jpg, jpeg, pdf, zip, rar, doc, xls, mp4 files are allowed.")
      return false;
    }
    this.file = e.target.files[0];
    this.fileName = this.file.name;
    this.bannerFormGroup.patchValue({ bannerImage: this.file, imageURL: this.file.name })
    var reader = new FileReader();
    reader.onload = (e) => {
      let binaryData = reader.result;
      this.bannerFormGroup.patchValue({ imageType: this.file.type, baseData: btoa(binaryData.toString()) });
    }
    reader.readAsBinaryString(this.file);
    let files = e.target.files;
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg'  ) {
      return true;
    }
    else {
      return false;
    }
  }
}
//https://travel-app-media.s3.ap-south-1.amazonaws.com
