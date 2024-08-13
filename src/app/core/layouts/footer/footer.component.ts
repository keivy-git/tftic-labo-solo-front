import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerInternalSections = [
    {
      title: 'FleaMarket',
      links: [
        {
          label: 'Qui somme nous ?',
          routerLink: '/about',
        },
        {
          label: 'Brocante',
          routerLink: '/fleamarkets',
        },
        {
          label: 'Contact',
          routerLink: '/contact',
        },
      ],
    },
    {
      title: 'Aide',
      links: [
        {
          label: 'Centre d´aide',
          routerLink: '/help',
        },
        {
          label: 'F.A.Q',
          routerLink: '/faq',
        },
        {
          label: 'Politque de confidentialité',
          routerLink: '/privacy',
        },
      ],
    },
  ];

  footerExternalSections = [
    {
      title: 'Réseau sociaux',
      links: [
        {
          label: 'Facebook',
          url: 'https://www.facebook.com',
          svgPath: 'assets/icons/socials/facebook.svg',
          alt: 'Facebook Logo',
        },
        {
          label: 'Instagram',
          url: 'https://www.instagram.com',
          svgPath: 'assets/icons/socials/instagram.svg',
          alt: 'Instagram Logo',
        },
        {
          label: 'Youtube',
          url: 'https://www.youtube.com',
          svgPath: 'assets/icons/socials/youtube.svg',
          alt: 'YouTube Logo',
        },
      ],
    },
  ];
}
