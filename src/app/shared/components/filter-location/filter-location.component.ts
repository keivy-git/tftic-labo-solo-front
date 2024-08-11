import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {FleaMarketService} from "../../../features/flea-market/services/flea-market.service";
import {AccordionModule} from "primeng/accordion";
import {FormsModule} from "@angular/forms";
import {ZipCity} from "../../models/address.model";

@Component({
  selector: 'app-filter-location',
  standalone: true,
  imports: [AccordionModule, AutoCompleteModule, FormsModule],
  templateUrl: './filter-location.component.html',
  styleUrl: './filter-location.component.scss',
})
export class FilterLocationComponent implements OnInit{
  private readonly fleaMarketService = inject(FleaMarketService);

  private locationList!: ZipCity[];
  protected filteredLocation: ZipCity[] = [];
  protected selectedLocation!: ZipCity;

  @Output() newLocationFilter = new EventEmitter<ZipCity>();

  ngOnInit(): void {
    this.fleaMarketService.getAllLocations().subscribe((locations) => {
      this.locationList = locations;
    });
  }

  onChangeLocation(newLocation: ZipCity) {
    if (!newLocation) {
      newLocation = { zip: '', city: '' };
    }

    this.newLocationFilter.emit(newLocation);
  }

  search(event: AutoCompleteCompleteEvent) {
    this.filteredLocation = this.locationList.filter(
      (zipCity) =>
        zipCity.zip.toString().includes(event.query.toLowerCase()) ||
        zipCity.city.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  getLocationLabel(location: ZipCity): string {
    return `${location.zip} - ${location.city}`;
  }


}
