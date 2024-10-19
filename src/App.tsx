import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import OptimizedRoute from './components/OptimizedRoute';
import { Address, Route } from './types';
import { optimizeRoute } from './utils/routeOptimizer';
import { MapPin } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  // ... rest of the component remains the same
}

export default App;