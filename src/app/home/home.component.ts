import {Component, Input, WritableSignal} from '@angular/core';
import {FilterLocationComponent} from "../shared/components/filter-location/filter-location.component";
import {ZipCity} from "../shared/models/address.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() filters!: WritableSignal<Map<string, string>>;
  @Input() page!: WritableSignal<number>;

  addFilter(filter: ZipCity) {
    this.filters.update((filters) => {
      return new Map([...filters, ['city', filter.city], ['zip', filter.zip]]);
    });

    this.page.set(0);
  }
}
