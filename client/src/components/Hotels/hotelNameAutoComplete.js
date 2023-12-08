
import React, { useState } from 'react'; // import useState
import axios from 'axios'; // import axios
function HotelAutocomplete() { // define the HotelAutocomplete functional component
    // initialize the keyword and subType state variables
    const [keyword, setKeyword] = useState('');
    const [subType, setSubType] = useState('HOTEL_LEISURE');
    const [autocompleteResults, setAutocompleteResults] = useState([]);

    // const [keyword, setKeyword] = useState(''); // initialize the keyword state variable
    const fetchAutocompleteResults = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/hotelNameAutocomplete/hotels/autocomplete?keyword=${keyword}&subType=${subType}`);


            setAutocompleteResults(response.data);
        } catch (error) {
            console.error("Error fetching autocomplete results:", error);
        }
    };

    return ( // return the HotelAutocomplete JSX code to render the form fields and the autocomplete results
        <div>
            <input 
                type="text" 
                placeholder="Enter hotel name..." 
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
            <select value={subType} onChange={e => setSubType(e.target.value)}>
                <option value="HOTEL_LEISURE">Hotel Leisure</option>
                <option value="HOTEL_GDS">Hotel GDS</option>
            </select>
            <button onClick={fetchAutocompleteResults}>Search</button>
            <ul>
                {autocompleteResults.map((result, index) => (
                    <li key={index}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default HotelAutocomplete;