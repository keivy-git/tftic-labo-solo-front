import {Component, EventEmitter, Output} from '@angular/core';
import {ZipCity} from "../../models/zip-city";

@Component({
  selector: 'app-filter-location',
  standalone: true,
  imports: [],
  templateUrl: './filter-location.component.html',
  styleUrl: './filter-location.component.scss'
})
export class FilterLocationComponent {

  @Output() newLocationFilter = new EventEmitter<ZipCity>();

}
