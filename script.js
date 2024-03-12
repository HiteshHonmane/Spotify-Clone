document.addEventListener("DOMContentLoaded", function () {
    console.log("Here We go");

    async function cardCategory() {
        const input = document.querySelector(".search-input");
        const search = document.querySelector(".search");

        // Set default value on page load
        input.value = "eminem";

        // Define the search event handler function
        const searchHandler = async () => {
            let value = input.value;
            const artist = value ? value : "eminem";
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '2f8ec1fc40msh87d5856848d2f52p1b7503jsne20b9ce85403',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                },
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);

                const categoryCard = document.querySelector(".list");
                // Clear previous results
                categoryCard.innerHTML = "";

                result.data.forEach(song => {
                    const songI = song.album.cover;
                    const songN = song.title;
                    const SongSrc = song.preview;

                    categoryCard.innerHTML += `
                        <div class="cards">
                            <img class="coverimg" src="${songI}" alt="">
                            <div class="song-info">
                                <h4>${songN}</h4>
                                <audio id="audio"  controls="" src="${SongSrc}"></audio>
                            </div>
                        </div>`;
                });
            } catch (error) {
                console.error(error);
            }
        };

        // Call the search event handler function
        searchHandler();

        // Attach the search event listener
        search.addEventListener('click', searchHandler);

        
    }

    // Call the function
    cardCategory();
});
