import { Component, inject, OnInit } from '@angular/core';
import { FleaMarketService } from '../../services/flea-market.service';
import { ZipCity } from '../../../../shared/models/address.model';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';
import { FleaMarket_Form, FleaMarketForm } from '../../forms/flea-market-form';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-add-fleamarket',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    AutoCompleteModule,
    Button,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    InputTextareaModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './add-fleamarket.component.html',
  styleUrl: './add-fleamarket.component.scss',
})
export class AddFleamarketComponent implements OnInit {
  private readonly fleaMarketService = inject(FleaMarketService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  filteredLocations: ZipCity[] = [];
  fleaMarketForm!: FormGroup;

  addFleaMarket() {
    let valueForm: FleaMarketForm = {
      title: this.fleaMarketForm.get('title')?.value,
      description: this.fleaMarketForm.get('description')?.value,
      shortDescription: this.fleaMarketForm.get('shortDescription')?.value,
      urlPicture: this.fleaMarketForm.get('urlPicture')?.value,
      dateBegin: this.fleaMarketForm.get('dateBegin')?.value,
      dateEnd: this.fleaMarketForm.get('dateEnd')?.value,
      pricePerMeter: this.fleaMarketForm.get('pricePerMeter')?.value,
      locationPrice: this.fleaMarketForm.get('locationPrice')?.value,
      address: {
        street: this.fleaMarketForm.get('street')?.value,
        zipCity: {
          city: this.fleaMarketForm.get('city')?.value,
          zip: this.fleaMarketForm.get('zip')?.value,
        },
      },
    };

    this.fleaMarketService.postFleaMarket(valueForm).subscribe({
      next: (data) => {
        this.route.navigate(['/']).then();
        this.notificationService.showSuccess(
          'Ajouter avec succès',
          'La brocante à été ajouté avec succès',
        );
      },
      error: (err) => {
        this.notificationService.showError(
          "Ne peut pas être ajouter, une erreur s'est produite",
          JSON.stringify(err.error),
        );
      },
    });
  }

  ngOnInit(): void {
    this.fleaMarketForm = this.formBuilder.group(FleaMarket_Form);
    this.fleaMarketForm
      .get('zip')
      ?.valueChanges.pipe(
        switchMap((value) =>
          this.fleaMarketService
            .getOneLocation(value, null)
            .pipe(catchError(() => of([]))),
        ),
      )
      .subscribe({
        next: (datas) => {
          this.filteredLocations = datas;
        },
      });
    this.fleaMarketForm
      .get('city')
      ?.valueChanges.pipe(
        switchMap((value) =>
          this.fleaMarketService
            .getOneLocation(null, value)
            .pipe(catchError(() => of([]))),
        ),
      )
      .subscribe({
        next: (datas) => {
          this.filteredLocations = datas;
        },
      });
  }

  setZip(event: AutoCompleteSelectEvent) {
    const city = event.value;
    this.fleaMarketForm.get('city')?.setValue(city);
    for (let z of this.filteredLocations) {
      if (z.city == city) {
        this.fleaMarketForm.get('zip')?.setValue(z.zip);
      }
    }
  }

  setCity(event: AutoCompleteSelectEvent) {
    const zip = event.value;
    this.fleaMarketForm.get('zip')?.setValue(zip);
    this.fleaMarketForm
      .get('city')
      ?.setValue(
        this.filteredLocations.find((location) => location.zip === zip)?.city,
      );
  }

  get cities(): string[] {
    return this.filteredLocations.map((f) => f.city);
  }

  get zips(): string[] {
    return this.filteredLocations.map((f) => f.zip);
  }
}
