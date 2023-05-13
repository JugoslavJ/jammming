import React, {useState} from 'react';
import './App.css';

import Spotify from '../../helper/Spotify';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App(){
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [playlistTracks, setPlaylistTracks] = useState([]);

    function handleSearch(term){
        Spotify.search(term)
        .then((result) => setSearchResults(result));
    }

    function handleNameChange(newName){
        setPlaylistName(newName);
    }

    function addTrack(track){
        if(playlistTracks.some( (savedTrack) => savedTrack.id === track.id)){
            return;
        };

        setPlaylistTracks((savedTracks) => [...savedTracks, track]);
    }

    function removeTrack(track){
        const playlistUpdated = playlistTracks.filter((savedTrack) => {
            return (savedTrack.id !== track.id);
        });

        setPlaylistTracks(playlistUpdated);
    }

    function handleSave(){
        const playlistUris = playlistTracks.map( (track) => {
            return track.uri;
        });
        Spotify.save(playlistName, playlistUris);
    }

    return (
        <div className="App">
            <h1 className="App__title">Jammming</h1>
            <SearchBar 
                onSearch={handleSearch} 
            />
            <SearchResults 
                searchResults={searchResults}
                onAdd={addTrack}
            />
            <Playlist
                tracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={handleNameChange}
                onSave={handleSave}
            />
        </div>
    );

}

export default App;