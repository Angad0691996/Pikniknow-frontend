import { Injectable } from "@angular/core";
import { TOKEN, LOGIN_USER } from '../constant/constants';
import { ROLE_TYPES } from '../enum/enums';

@Injectable()
export class StorageService {

  constructor() { }
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  get userId(): number {
    let data = JSON.parse(localStorage.getItem(LOGIN_USER));
    return data.userId;
  }

  get roleName(): string {
    let data = JSON.parse(localStorage.getItem(LOGIN_USER));
    let roleName = ROLE_TYPES.find(x => x.id == data.roleId);
    return roleName.name;
  }

  get roleId(): number {
    let data = JSON.parse(localStorage.getItem(LOGIN_USER));
    return data.roleId;
  }

  get isLogin(): boolean {
    let data = localStorage.getItem(TOKEN);
    if (data) {
      return true;
    }
    return false;
  }

}
