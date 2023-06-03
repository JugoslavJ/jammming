import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults({searchResults, onAdd}){
    return (
        <div className="SearchResults">
            <h2 className="SearchResults__title">Search Results</h2>
            <div className="SearchResults__TrackList">
                <TrackList 
                    tracks={searchResults}
                    onAdd={onAdd}
                />
            </div>
        </div>
    ); 
}   

export default SearchResults;