import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { NgClass } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, NgClass, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  itemsLog: MenuItem[] | undefined;
  private readonly route = inject(Router);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Brocante',
        icon: 'pi pi-star',
        routerLink: '/fleamarkets'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      },
    ];
    this.itemsLog = [
      {
        label: 'Se connecter',
        routerLink: '/login',
      },
      {
        label: 'S´enregistrer',
        routerLink: '/register'
      },
    ];
  }
}
