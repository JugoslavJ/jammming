import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults({searchResults, onAdd}){
    return (
        <div className="SearchResults">
            <TrackList 
                tracks={searchResults}
                onAdd={onAdd}
            />
        </div>
    ); 
}   

export default SearchResults;