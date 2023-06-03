import React from 'react';
import './Track.css';

function Track({track, isRemoval, onRemove, onAdd}){
    function returnAction(){
        if(isRemoval){
            return (
                <button className='Track__action'>
                    -
                </button>
                );
        } else {
            return (
                <button className='Track__action'>
                    +
                </button>
                );
        }
    }

    function handleClick(){
        return isRemoval ? onRemove(track) : onAdd(track);
    }
    return (
        <div className="Track" onClick={handleClick}>
            <div className="Track__information">
                <h3 className="Track__name">{track.name}</h3>
                <p className="Track__ArtistAlbum">
                    {track.artist} - {track.album}
                </p>
            </div>
            {returnAction()}
        </div>
    );
}

export default Track;