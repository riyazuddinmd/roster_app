export interface Address {
  id: number;
  name: string;
  placeId: string;
}

export interface Route {
  addresses: Address[];
  totalDistance: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}