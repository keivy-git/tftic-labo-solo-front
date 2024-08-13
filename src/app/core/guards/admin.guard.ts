import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { ROLES } from '../constants/roles';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser?.roles.includes(ROLES.ADMIN)) {
    return true;
  }
  router.createUrlTree(['/']);
  return false;
};
