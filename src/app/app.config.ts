import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import {AppRoute} from './app.route';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { baseInterceptor } from './core/interceptors/base.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import {AuthService} from "./features/auth/services/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AppRoute, withDebugTracing()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([baseInterceptor, jwtInterceptor])),
    MessageService,
    AuthService
  ],
};
