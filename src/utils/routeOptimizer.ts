import { Address, Route, LatLng } from '../types';

async function getDistanceMatrix(addresses: Address[]): Promise<number[][]> {
  const service = new google.maps.DistanceMatrixService();
  const placeIds = addresses.map(addr => ({ placeId: addr.placeId }));

  try {
    const response = await service.getDistanceMatrix({
      origins: placeIds,
      destinations: placeIds,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (response.rows) {
      return response.rows.map(row => 
        row.elements ? row.elements.map(element => element.distance ? element.distance.value : Infinity) : []
      );
    }
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
  }

  return [];
}

export async function optimizeRoute(addresses: Address[]): Promise<Route> {
  const distanceMatrix = await getDistanceMatrix(addresses);
  const n = addresses.length;
  const visited = new Set<number>();
  const optimizedRoute: Address[] = [addresses[0]];
  visited.add(0);
  let totalDistance = 0;

  for (let i = 1; i < n; i++) {
    let minDistance = Infinity;
    let nextIndex = -1;
    const lastIndex = optimizedRoute.length - 1;

    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && distanceMatrix[lastIndex][j] < minDistance) {
        minDistance = distanceMatrix[lastIndex][j];
        nextIndex = j;
      }
    }

    if (nextIndex !== -1) {
      optimizedRoute.push(addresses[nextIndex]);
      visited.add(nextIndex);
      totalDistance += minDistance;
    }
  }

  // Add the return trip to the starting point
  const lastIndex = optimizedRoute.length - 1;
  totalDistance += distanceMatrix[lastIndex][0];
  optimizedRoute.push(addresses[0]);

  return { addresses: optimizedRoute, totalDistance: totalDistance / 1000 }; // Convert to km
}