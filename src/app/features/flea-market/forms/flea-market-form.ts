import {Address} from "../../../shared/models/address.model";
import {FleaMarket} from "../models/flea-market.model";
import {Validators} from "@angular/forms";

export interface FleaMarketForm {
  title: string;
  description: string;
  shortDescription: string;
  urlPicture: string;
  dateBegin: Date;
  dateEnd: Date;
  pricePerMeter: number;
  locationPrice: number;
  street: string;
  city: string;
  zip: string;
}

export const FleaMarket_Form = {
  title: ['', Validators.required],
  description: ['', Validators.required],
  shortDescription: ['', Validators.required],
  urlPicture: [''],
  dateBegin: ['', Validators.required],
  dateEnd: ['', Validators.required],
  pricePerMeter: ['0', Validators.required],
  locationPrice: ['0', Validators.required],
  street: ['', Validators.required],
  city: ['', Validators.required],
  zip: ['', Validators.required],
}
