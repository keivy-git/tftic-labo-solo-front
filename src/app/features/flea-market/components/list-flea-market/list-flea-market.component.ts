import {Component, Input, WritableSignal} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass} from "@angular/common";
import {Observable} from "rxjs";
import {FleaMarket} from "../../models/flea-market.model";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";

@Component({
  selector: 'app-list-flea-market',
  standalone: true,
  imports: [
    AsyncPipe,
    PaginatorModule,
    Button,
    CardModule,
    DatePipe,
    DataViewModule,
    NgClass,
  ],
  templateUrl: './list-flea-market.component.html',
  styleUrl: './list-flea-market.component.scss',
})
export class ListFleaMarketComponent {
  @Input() fleaMarket$!: Observable<FleaMarket[]>;
  @Input() elementsPerPage?: number;
  @Input() page?: WritableSignal<number>;
  @Input() fleaMarkets!: FleaMarket[];


  onPageChange(paginatorState: PaginatorState) {
    const page = paginatorState.page;

    if (page !== undefined && this.page) {
      this.page.set(page);
    }
  }
}
