import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({tracks, onRemove, onNameChange, onSave}){
    function handleNameChange(event){
        onNameChange(event.target.value);
    }

    return (
        <div className="Playlist">
            <input 
                className="Playlist__name" 
                onChange={handleNameChange} 
                defaultValue={"New Playlist"} 
            />
            <TrackList 
                tracks={tracks}
                onRemove={onRemove}
                isRemoval={true}
            />
            <button 
                className="Playlist__save"
                onClick={onSave}
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;