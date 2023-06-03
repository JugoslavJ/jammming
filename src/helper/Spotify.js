const clientId = "207f26b5dd3f42a7a74177028af6d002";
const redirectUri = "http://jugoslavjovicic.com/jammming";
let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        const currLocString = window.location.href;
        const accessTokenStrArr = currLocString.match(/access_token=([^&]*)/);
        const expiresInStrArr = currLocString.match(/expires_in=([^&]*)/);
        
        //If token exists, return it, else grab access token
        if(accessTokenStrArr && expiresInStrArr){
            accessToken = accessTokenStrArr[1];
            const expiresIn = Number(expiresInStrArr[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, './');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();

        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if( response.ok){
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        } else {
            console.log(response.text());
        }
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    },

    dummySave(playlistName, playlistUris){

    },

    dummySearch(term){
        function trackFactory(name, artist, album, id){
            return {
                name: name,
                artist: artist,
                album: album,
                id: id
            }
        }
        let trackList = [];
        for(let i=0; i < 5; i++){
            trackList.push(trackFactory("name"+i, "artist"+i, "album"+i, i));
        }
        return trackList;
    }
}


export default Spotify;