import { FormControl, TextField } from "@mui/material";
import { useState, FC } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface LocationSearchInputProps {
  onSelect: (selectedLocation: {
    address: string;
    latLng: { lat: number; lng: number };
  }) => void;
}

const LocationSearchInput: FC<LocationSearchInputProps> = ({ onSelect }) => {
  const [address, setAddress] = useState<string>("");

  const handleChange = (value: string) => {
    setAddress(value);
  };

  const handleSelect = async (value: string) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      onSelect({ address: value, latLng });
      setAddress(value);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormControl
          sx={{
            width: "100%",
            ".autocomplete-dropdown-container": {
              cursor: "pointer",
            },
          }}
        >
          <TextField
            variant="standard"
            label="Endereço"
            size="small"
            {...getInputProps({
              placeholder: "Pesquisar endereço ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </FormControl>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
