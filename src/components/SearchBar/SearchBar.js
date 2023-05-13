import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}){
    const [term, setTerm] = useState("");

    function handleTermChange(event){
        setTerm(event.target.value);
    }

    function handleSearch(){
        onSearch(term);
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter a song title" onChange={handleTermChange} />
            <button className="SearchBar__button" onClick={handleSearch}>
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;