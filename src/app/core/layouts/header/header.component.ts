import { Component, computed, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { NgClass } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, NgClass, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  isLoggedIn = toSignal(this.authService.isLoggedIn$);
  isOrganizer = toSignal(this.authService.isOrganizer$);

  menuItemsLeft = computed(() => {
    const isOrganizer = this.isOrganizer();
    return [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Brocante',
        icon: 'pi pi-star',
        routerLink: '/fleamarkets',
      },
      {
        label: 'Ajouter une brocante',
        icon: 'pi pi-star',
        routerLink: '/add-fleamarkets',
        visible: isOrganizer,
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact',
      },
    ].filter((itemLeft) => itemLeft.visible !== false);
  });
  menuItemsRight = computed(() => {
    const isLoggedIn = this.isLoggedIn();
    return [
      {
        label: 'Se connecter',
        routerLink: '/login',
        visible: !isLoggedIn,
      },
      {
        label: 'S´enregistrer',
        routerLink: '/register',
        visible: !isLoggedIn,
      },
      {
        label: 'Se déconnecter',
        command: () => this.handleLogout(),
        visible: isLoggedIn,
      },
    ].filter((item) => item.visible !== false);
  });
  handleLogout() {
    this.authService.logout();

    this.notificationService.showSuccess(
      'auth.logout.success.summary',
      'auth.logout.success.detail',
    );
  }
}
