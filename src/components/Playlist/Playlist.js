import React, {useState} from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({tracks, onRemove, onNameChange, onSave}){
    const [playlistValue, setPlaylistValue] = useState("New Playlist");
    
    function handleNameChange(event){
        setPlaylistValue(event.target.value);
        onNameChange(event.target.value);
    }

    function handleSave(){
        onSave();
        setPlaylistValue("New Playlist");
    }

    return (
        <div className="Playlist">
            <h2 className="Playlist__title">Playlist</h2>
            <div className="Playlist__input">
                <input 
                    className="Playlist__name" 
                    onChange={handleNameChange} 
                    defaultValue="New Playlist"
                    value={playlistValue}
                />
                <button 
                    className="Playlist__save"
                    onClick={handleSave}
                >
                    SAVE TO SPOTIFY
                </button>
            </div>
            <div className="Playlist__TrackList">
                <TrackList
                    tracks={tracks}
                    onRemove={onRemove}
                    isRemoval={true}
                />
            </div>
        </div>
    );
}

export default Playlist;