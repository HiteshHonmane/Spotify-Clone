const APIController = (function(){
    const clientId = ''
    const clientSecret = ''

    //private methods
    const _getToken = async () =>{
        const result = await fetch('',{
            method : 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body:'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.acess_token;
    }
    const _getGenres = async (token)=>{
        const result = await fetch ('', {
            method:'GET',
            headers:{'Authorization': 'Bearer ' + token}
        });
        const data = await result.json();
        return data.categories.item;
    }

    const _getPlaylistByGenre = async (token, generId)=>{
        const limit = 10 ;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${generId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers:{'Authorization': 'Bearer' + token }
        });
        const data = await result.json();
        return data.platlists.items;
    }
    const _getTracks = async (token, tracksEndPoints) =>{
        const limit = 10;
        const result = await fetch(`${tracksEndPoints}?limit=${limit}`,{
            method: 'GET',
            headers:{'Authorization': 'Bearer' + token}
        });
    }

    

    
})();

// Example usage
APIController.getToken().then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});
