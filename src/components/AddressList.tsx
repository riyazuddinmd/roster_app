import React from 'react';
import { Address } from '../types';
import { MapPin, Trash2 } from 'lucide-react';

interface AddressListProps {
  addresses: Address[];
  onRemoveAddress: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onRemoveAddress }) => {
  return (
    <ul className="space-y-2">
      {addresses.map((address) => (
        <li key={address.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-indigo-500 mr-2" />
            <span>{address.name || 'Unnamed Address'}</span>
          </div>
          <button
            onClick={() => onRemoveAddress(address.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AddressList;