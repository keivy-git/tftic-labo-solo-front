import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {FleaMarket, PageFleaMarket} from "../models/flea-market.model";
import {COMMON} from "../../../core/constants/common";
import {API_ENDPOINTS} from "../../../core/constants/api-endpoint";
import {ZipCity} from "../../../shared/models/address.model";
import {FleaMarket_Form, FleaMarketForm} from "../forms/flea-market-form";

@Injectable({
  providedIn: 'root',
})
export class FleaMarketService {
  private readonly httpClient = inject(HttpClient)

  getAllFleaMarket(
    params: Map<string, string> = new Map(),
    page: number = 0,
  ):Observable<PageFleaMarket> {
      let httpParams = new HttpParams().set(COMMON.page, page.toString());

      for (let [key, value] of params) {
        httpParams = httpParams.append(key, value);
      }

      return this.httpClient
        .get<PageFleaMarket>(`${API_ENDPOINTS.fleaMarket.fleaMarketGetAll}`, {
          params: httpParams,
        })
        .pipe(
          map((pageFleaMarket) => {
            return {
              ...pageFleaMarket,
              fleaMarkets: pageFleaMarket.fleaMarkets.map(
                (fleaMarket: FleaMarket) =>
                  ({
                    ...fleaMarket,
                    createdAt: parseDate(fleaMarket.createdAt),
                  }) as FleaMarket,
              )
            }
          })
        )
  }

  getAllLocations(): Observable<ZipCity[]> {
    return this.httpClient.get<ZipCity[]>(API_ENDPOINTS.zipCity.zipCity);
  }

  postFleaMarket(newFleaMarket: FleaMarketForm): Observable<FleaMarketForm> {
    return this.httpClient.post<FleaMarketForm>(API_ENDPOINTS.fleaMarket.fleaMarketCreate, newFleaMarket);
  }

}
export const parseDate = (date: number | string | Date): Date => {
  return new Date(date);
};
