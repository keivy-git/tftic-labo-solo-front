import { inject, Injectable } from '@angular/core';
import {
  CookieOptions,
  CookieService as NgxCookieService,
} from 'ngx-cookie-service';
import { COMMON } from '../constants/common';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly cookieService = inject(NgxCookieService);

  get(name: string): string {
    return this.cookieService.get(name);
  }
  set(name: string, value: string): void {
    const cookieOptions: CookieOptions = {
      path: COMMON.rootPath,
    };
    this.cookieService.set(name, value, cookieOptions);
  }

  delete(name: string): void {
    this.cookieService.delete(name);
  }
}
