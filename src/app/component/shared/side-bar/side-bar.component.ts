import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/domain/service/storage-service';
import { ROLE_TYPES, Role } from 'src/app/domain/enum/enums';
import { UserAddComponent } from '../../user/user-add/user-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ACTIVE_MENU } from 'src/app/domain/constant/constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  roleName: string;
  activeMenu: string = "dashboard";
  roleEnums: any = Role;
  currentRoleId: number;
  constructor(private storageService: StorageService,  public dialog: MatDialog,) {
    let activeMenu = this.storageService.get(ACTIVE_MENU);
    if (activeMenu) { this.activeMenu = activeMenu }
  }

  ngOnInit() {
    this.roleName = this.storageService.roleName;
    this.currentRoleId = this.storageService.roleId;
  }


  changeMenu(menuName) {
    this.activeMenu = menuName;
    this.storageService.set(ACTIVE_MENU, menuName)
  }
  editUser() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px',
      data: { userId: this.storageService.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
