import React, { useState } from 'react';
import { Address } from '../types';
import { MapPin } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';

interface AddressFormProps {
  onAddAddress: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddAddress }) => {
  const [name, setName] = useState('');
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.place_id) {
        const newAddress: Address = {
          id: Date.now(),
          name: name || place.name || '',
          placeId: place.place_id,
        };
        onAddAddress(newAddress);
        setName('');
        if (autocomplete.getPlace().name) {
          // @ts-ignore
          document.getElementById('autocomplete').value = '';
        }
      } else {
        alert('Please select a valid address from the dropdown.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Address Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Home, Office, etc."
        />
      </div>
      <div>
        <label htmlFor="autocomplete" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <Autocomplete onLoad={onLoad} onPlaceChanged={() => {}}>
          <input
            type="text"
            id="autocomplete"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter an address"
          />
        </Autocomplete>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Add Address
      </button>
    </form>
  );
};

export default AddressForm;