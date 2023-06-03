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

        //setSearchResults(Spotify.dummySearch());
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

        const plistName = playlistName;
        //Spotify.dummySave(playlistName, playlistUris);
        Spotify.savePlaylist(playlistName, playlistUris)
        .then((result) => alert("Playlist " + plistName + " saved succesfully!"))
        .catch( (error) => console.log(error));
            
        setPlaylistTracks([]);
        setPlaylistName("New Playlist");
    }
    Spotify.getAccessToken();
    return (
        <div className="App">
            <h1 className="App__title">Jammming</h1>
            <SearchBar 
                onSearch={handleSearch} 
            />
            <div className="App__tracklistContainers">
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
        </div>
    );

}

export default App;