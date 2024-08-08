import { inject, Injectable, OnInit } from '@angular/core';
import { CookieService } from '../../../core/services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IAuth } from '../models/auth.model';
import { ROLES } from '../../../core/constants/roles';
import { COMMON } from '../../../core/constants/common';
import { ILoginForm } from '../forms/login.form';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoint';
import {
  IRegisterForm,
  IRegisterOrganizer,
  IRegisterSecondHandDealer,
} from '../forms/register.form';
import { UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private _currentUser$ = new BehaviorSubject<IAuth | null>(null);

  private readonly cookieService = inject(CookieService);
  private readonly httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.loadUser();
  }

  get currentUser$(): Observable<IAuth | null> {
    return this._currentUser$.asObservable();
  }

  get currentUser(): IAuth | null {
    return this._currentUser$.value;
  }
  getCurrentUserRoles(): string | any[] {
    return this.currentUser?.roles || [];
  }
  get isOrganizer(): boolean {
    return this.getCurrentUserRoles().includes(ROLES.ORGANIZER);
  }

  get isSecondHandDealer(): boolean {
    return this.getCurrentUserRoles().includes(ROLES.SECONDHANDDEALER);
  }
  get userId(): number | null {
    return this.currentUser?.user.id || null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._currentUser$.pipe(map((auth) => !!auth));
  }

  get isOrganizer$(): Observable<boolean> {
    return this._currentUser$.pipe(
      map((auth) => !!auth?.roles.includes(ROLES.ORGANIZER)),
    );
  }

  get isSecondHandDealer$(): Observable<boolean> {
    return this._currentUser$.pipe(
      map((auth) => !!auth?.roles.includes(ROLES.SECONDHANDDEALER)),
    );
  }

  get token(): string | null {
    return this.currentUser?.accessToken || null;
  }

  set currentUser(auth) {
    if (auth) {
      this.cookieService.set(
        COMMON.user.cookieName,
        btoa(JSON.stringify(auth)),
      );
    } else {
      this.cookieService.delete(COMMON.user.cookieName);
    }
    this._currentUser$.next(auth);
  }

  login(form: ILoginForm) {
    return this.httpClient
      .post<IAuth>(`${API_ENDPOINTS.login}`, form)
      .pipe(tap((auth) => (this.currentUser = auth)));
  }

  registerUser(
    form: IRegisterForm | IRegisterOrganizer | IRegisterSecondHandDealer,
    userType: UserType,
  ) {
    return this.httpClient
      .post<IAuth>(`${API_ENDPOINTS.register[userType]}`, form)
      .pipe(tap((auth) => (this.currentUser = auth)));
  }

  logout() {
    this.currentUser = null;
  }

  loadUser() {
    const userCookie = this.cookieService.get(COMMON.user.cookieName);

    if (userCookie) {
      this.currentUser = JSON.parse(atob(userCookie));
    }
  }
}
