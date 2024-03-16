document.addEventListener("DOMContentLoaded", function () {
    console.log("Here We go");

    async function cardCategory() {
        const input = document.querySelector(".search-input");
        const search = document.querySelector(".search");
        const playBarPlay = document.querySelector('#play');

        let currentPlayingAudio = null; // Variable to store currently playing audio

        // Define the search event handler function
        const searchHandler = async () => {
            let value = input.value;
            const artist = value ? value : "eminem"; // Default artist
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

                    const card = document.createElement('div');
                    card.classList.add('cards');
                    card.innerHTML = `
                        <img class="coverimg" src="${songI}" alt="">
                        <div class="song-info">
                            <div class='song-name'>${songN}</div> 
                        </div>
                        <div class="card-icon">
                            <audio class="audio" src="${SongSrc}"></audio>
                            <img width='50px' class='playButton' src="assets/play.svg" alt="">
                        </div>`;

                    // Attach event listener for play/pause functionality
                    const playButton = card.querySelector('.playButton');
                    const audio = card.querySelector('.audio');

                    playButton.addEventListener('click', function () {
                        // Pause all other audio elements
                        document.querySelectorAll('.audio').forEach(a => {
                            if (a !== audio) {
                                a.pause();
                                a.currentTime = 0; // Reset to beginning
                                const otherPlayButton = a.parentNode.querySelector(".playButton");
                                if (otherPlayButton) {
                                    otherPlayButton.src = 'assets/play.svg';
                                }
                            }
                        });

                        if (audio.paused) {
                            audio.play()
                                .then(() => {
                                    playButton.src = "assets/pause.svg"; // Change to pause icon
                                    playBarPlay.src = "assets/pause.svg"; // Change playbar play button icon to pause
                                    currentPlayingAudio = audio; // Update currently playing audio
                                })
                                .catch(error => {
                                    console.error("Error playing audio:", error);
                                });
                        } else {
                            audio.pause();
                            audio.currentTime = 0; // Resets audio to the beginning
                            playButton.src = "assets/play.svg"; // Change back to play icon
                            playBarPlay.src = "assets/play.svg"; // Change playbar play button icon to play
                            currentPlayingAudio = null; // No audio is currently playing
                        }
                    });

                    categoryCard.appendChild(card);
                });

            } catch (error) {
                console.error(error);
            }
        };

        // Call the search event handler function
        searchHandler();

        // Attach the search event listener
        search.addEventListener('click', searchHandler);

        // Attach event listener for play/pause functionality for play bar play button
        playBarPlay.addEventListener('click', function () {
            if (currentPlayingAudio) {
                if (currentPlayingAudio.paused) {
                    currentPlayingAudio.play()
                    console.log(currentPlayingAudio.title)
                        .then(() => {
                            playBarPlay.src = "assets/pause.svg"; // Change playbar play button icon to pause
                            
                        })
                        .catch(error => {
                            console.error("Error playing audio:", error);
                        });
                } else {
                    currentPlayingAudio.pause();
                    currentPlayingAudio.currentTime = 0; // Resets audio to the beginning
                    playBarPlay.src = "assets/play.svg"; // Change playbar play button icon to play
                    currentPlayingAudio = null; // No audio is currently playing
                    
                }
            } else {
                // If no audio is currently playing, find the first audio element and play it
                const firstAudio = document.querySelector('.audio');
                if (firstAudio) {
                    firstAudio.play()
                        .then(() => {
                            playBarPlay.src = "assets/pause.svg"; // Change playbar play button icon to pause
                            currentPlayingAudio = firstAudio; // Update currently playing audio
                        })
                        .catch(error => {
                            console.error("Error playing audio:", error);
                        });
                }
            }
        });
    }

    // Call the function
    cardCategory();
});
