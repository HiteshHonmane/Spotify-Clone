console.log("Here We go")
let currentSong = new Audio();

//Creating A function converts seconds to minutes

function secondsTominutesSecond(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Playing";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formatSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formatSeconds}`;

}

async function getSongs() {
    let a = await fetch("http://192.168.29.178:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }

    }
    return songs
    // console.log(songs)
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/"+ track)
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play()
        play.src = "assets/pause.svg"
    }

    document.querySelector(".songname").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function cardCatagery() {
    let categoryCard = document.querySelector(".list");

    const data = await fetch("https://v1.nocodeapi.com/hitesh/spotify/MUTUowepYbwCtcOD/browse/categoryPlaylist?category_id=hiphop");
    const parsedData = await data.json();

    parsedData.playlists.items.forEach((playlist) => {
        const songN = playlist.name;
        const songI = playlist.images[0].url;

        categoryCard.innerHTML += `
            <div class="cards ">
                <img class="coverimg" src="${songI}" alt="">
                <div class="song-info">
                    <h4>${songN}</h4>
                </div>
            </div>`;
    });
}

async function main() {
    // let songs = await getSongs()
    // console.log(songs)
    // playMusic(songs[0], true)

    // let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    // for (const song of songs) {
    //     let songname= `${song.replaceAll("%20"," ").replaceAll("[NCS Release].mp3","").replaceAll(/\([^)]*\)/g, '')} `
    //     songUL.innerHTML = songUL.innerHTML + `<li>
    //                     <img class="music-svg" src="assets/music.svg" alt="">
    //                     <div class="song-artist">
    //                         <div class="song-name" data-song ="${song}"> ${songname}
    //                         </div>
    //                         <div class="artist-name">
    //                         </div>
    //                     </div>
    //                     <div >
    //                         <img class="playsvg " src="assets/play.svg" alt="">
    //                     </div>
    //                     </li>`;

    // }
    //linking Event listner to all songs
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".song-name").innerHTML)
            playMusic(e.querySelector(".song-name").dataset.song)
        })
    })

    //Adding Event listner for play pause song
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "assets/pause.svg"

        } else {
            currentSong.pause()
            play.src = "assets/play.svg"
        }
    })

    // Time Update Listen function

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsTominutesSecond(currentSong.currentTime)}/ ${secondsTominutesSecond(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })
    //Adding Event listener to seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    //Hamburger Side bar 
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left_section").style.left = "0%"
    })
    //
    document.querySelector(".cross").addEventListener('click', () => {
        document.querySelector(".left_section").style.left = "-120%"
    })

}

// Call the function to fetch and populate the playlist cards
cardCatagery();

// Call the main function
main();





