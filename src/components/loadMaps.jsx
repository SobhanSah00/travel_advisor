import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import calculateRouteFromAtoB from "./calculateRouteFromAtoB"

const Map = ({ apikey }) => {
    const mapRef = useRef(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const platform = useRef(null);

    useEffect(() => {
        // Initialize platform once
        if (!platform.current) {
            platform.current = new H.service.Platform({ apikey });
        }

        // Initialize map
        const map = initializeMap();

        return () => {
            // Dispose map
            if (map) {
                map.dispose();
            }
        };
    }, [apikey]);

    const initializeMap = () => {
        const defaultLayers = platform.current.createDefaultLayers();
        const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: 20.2961, lng: 85.8245 }, // Center of Bhubaneswar
            zoom: 10,
            pixelRatio: window.devicePixelRatio || 1
        });
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        H.ui.UI.createDefault(map, defaultLayers);
        return map;
    };

    const handleGo = () => {
        if (from && to) {
            // Calculate route only if both "from" and "to" locations are provided
            calculateRouteFromAtoB(platform.current, from, to);
        } else {
            // Handle case where either "from" or "to" location is missing
            alert('Please provide both "From" and "To" locations.');
        }
    };
    
    




    const handleSearch = (query, input) => {
        const service = platform.current.getSearchService();
        // Inside handleSearch function
if (input === 'from') {
    console.log('Updating "from" input field:', query);
    setFrom(query);
} else if (input === 'to') {
    console.log('Updating "to" input field:', query);
    setTo(query);
}

        if (query.length > 2) {
            service.autosuggest({
                q: query,
                at: '20.2961,85.8245', // Bhubaneswar's coordinates
            }, result => {
                setActiveInput(input);
                setSuggestions(result.items);
                // Update input field value based on the active input
                if (input === 'from') {
                    setFrom(query);
                } else if (input === 'to') {
                    setTo(query);
                }
            }, error => {
                console.error('Error fetching suggestions:', error);
                // Handle error (e.g., display a message to the user)
            });
        } else {
            // Clear suggestions and input field value when query length is not enough
            // setSuggestions([]);
            // if (input === 'from') {
            //     setFrom('');
            // } else if (input === 'to') {
            //     setTo('');
            // }
            console.log("Sau");
        }
    };
    

    const selectSuggestion = item => {
        if (activeInput === 'from') {
            setFrom(item.title);
        } else if (activeInput === 'to') {
            setTo(item.title);
        }
        setSuggestions([]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-2 p-4">
                <input
                    type="text"
                    placeholder="From"
                    className="input input-bordered input-primary w-full"
                    value={from}
                    onChange={e => handleSearch(e.target.value, 'from')}
                />
                <input
                    type="text"
                    placeholder="To"
                    className="input input-bordered input-primary w-full"
                    value={to}
                    onChange={e => handleSearch(e.target.value, 'to')}
                />
            </div>
            <button onClick={handleGo} className="btn btn-primary">Go</button>

            {suggestions.length > 0 && (
                <ul className="absolute z-10 list-none bg-white rounded shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((item, index) => (
                        <li key={index} className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                            onClick={() => selectSuggestion(item)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
            <div ref={mapRef} className="h-96 w-full mt-4" />
        </div>
    );
};

export default Map;
