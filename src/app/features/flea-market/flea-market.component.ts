import {Component, effect, inject, signal} from '@angular/core';
import {FleaMarket} from "./models/flea-market.model";
import {map, Observable} from "rxjs";
import {FleaMarketService} from "./services/flea-market.service";
import {ListFleaMarketComponent} from "./components/list-flea-market/list-flea-market.component";

@Component({
  selector: 'app-flea-market',
  standalone: true,
  imports: [ListFleaMarketComponent],
  templateUrl: './flea-market.component.html',
  styleUrl: './flea-market.component.scss',
})
export class FleaMarketComponent {
  private readonly fleaMarketService = inject(FleaMarketService);

  protected fleaMarket$!: Observable<FleaMarket[]>;
  protected elementPerPage!: number;

  protected filters = signal<Map<string, string>>(new Map());
  protected page = signal<number>(0);

  constructor() {
    effect(() => {
      const filters = this.filters();
      const pageNumber = this.page();

      this.getAllFleamarket(filters, pageNumber);
    });
  }

  getAllFleamarket(filters?: Map<string, string>, page: number = 0) {
    this.fleaMarket$ = this.fleaMarketService
      .getAllFleaMarket(filters, page)
      .pipe(
        map((pageFleaMarket) => {
          this.elementPerPage = pageFleaMarket.elementsPerPage;

          return pageFleaMarket.fleaMarkets;
        }),
      );
  }
}
