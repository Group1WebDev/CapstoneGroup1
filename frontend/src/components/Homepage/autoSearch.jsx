// import React, { useState } from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// const LocationSearchInput = () => {
//   const [address, setAddress] = useState('');

//   const handleChange = (address) => {
//     setAddress(address);
//   };

//   const handleSelect = (address) => {
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => console.log('Success', latLng))
//       .catch((error) => console.error('Error', error));
//   };

//   return (
//     <PlacesAutocomplete
//       value={address}
//       onChange={handleChange}
//       onSelect={handleSelect}
//       searchOptions={{
//         types: ['(cities)'],
//         componentRestrictions: { country: 'ca' },
//       }}
//     >
//       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//         <div>
//           <input
//             {...getInputProps({
//               placeholder: 'Search Places ...',
//               className: 'location-search-input',
//             })}
//           />
//           <div className="autocomplete-dropdown-container">
//             {loading && <div>Loading...</div>}
//             {suggestions.map((suggestion) => {
//               const className = suggestion.active
//                 ? 'suggestion-item--active'
//                 : 'suggestion-item';
//               const style = suggestion.active
//                 ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                 : { backgroundColor: '#ffffff', cursor: 'pointer' };
//               return (
//                 <div
//                   key={suggestion.placeId}
//                   {...getSuggestionItemProps(suggestion, {
//                     className,
//                     style,
//                   })}
//                 >
//                   <span>{suggestion.description}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </PlacesAutocomplete>
//   );
// };

// export default LocationSearchInput;