export interface Location {
  lat: number;
  lng: number;
}

export interface Mandi {
  name: string;
  state: string;
  district: string;
  crop: string;
  price: number;
  date: string;
  location: Location;
}

export interface Trip {
  crop: string;
  quantity: number;
  vehicle: string;
  sourceLocation: Location;
}