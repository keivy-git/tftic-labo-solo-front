import {Address} from "../../../shared/models/address.model";

export interface FleaMarket {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  urlPicture: string;
  createdAt: Date;
  dateBegin: string;
  dateEnd: string;
  activeDay: number;
  isActive: boolean;
  locationPrice: number;
  pricePerMeter: number;
  phoneNumberEvent: string;
  numberOfPlaces: number;
  address: Address;
  organizer: Organizer;
}

export interface PageFleaMarket {
  fleaMarkets: FleaMarket[];
  elementsPerPage: number;
  totalElements: number;
  totalPages: number;
}
export interface Organizer {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  organizationName: string;
  organizationPhone: string;
}

export interface SecondHandDealer {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  birthDate: Date;
}


