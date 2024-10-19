import React from 'react';
import { Route } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface OptimizedRouteProps {
  route: Route | null;
}

const OptimizedRoute: React.FC<OptimizedRouteProps> = ({ route }) => {
  if (!route) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Optimized Route</h2>
      <div className="flex flex-wrap items-center">
        {route.addresses.map((address, index) => (
          <React.Fragment key={address.id}>
            <div className="flex items-center bg-indigo-100 rounded-full px-3 py-1 m-1">
              <MapPin className="h-4 w-4 text-indigo-500 mr-1" />
              <span className="text-sm">{address.name}</span>
            </div>
            {index < route.addresses.length - 1 && (
              <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Total distance: {route.totalDistance.toFixed(2)} km
      </p>
    </div>
  );
};

export default OptimizedRoute;