import { Component, Input, WritableSignal} from '@angular/core';
import { ZipCity} from "../../models/zip-city";
import {FilterLocationComponent} from "../filter-location/filter-location.component";

@Component({
  selector: 'app-filters-zip-city',
  standalone: true,
  imports: [FilterLocationComponent],
  templateUrl: './filters-zip-city.component.html',
  styleUrl: './filters-zip-city.component.scss',
})
export class FiltersZipCityComponent {
  @Input() filtersZipCity!: WritableSignal<Map<String, String>>;
  @Input() page!: WritableSignal<number>;

  addFilter(filter: ZipCity) {
    this.filtersZipCity.update((filters) => {
      return new Map([...filters, ['city', filter.city], ['zip', filter.zip]]);
    });

    this.page.set(0);
  }
}
