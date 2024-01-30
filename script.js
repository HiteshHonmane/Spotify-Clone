console.log("Here We go")

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

async function main() {
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                        <img class="music-svg" src="assets/music.svg" alt="">
                        <div class="song-artist">
                            <div class="song-name">${song.replaceAll("%20"," ").replaceAll("[NCS Release].mp3","").replaceAll(/\([^)]*\)/g, '')} 
                            </div>
                            <div class="artist-name">
                            </div>
                        </div>
                        <div >
                            <img class="playsvg " src="assets/play.svg" alt="">
                        </div>
                        </li>`;
        
    }
    
    var audio = new Audio(songs[0]);
    // audio.play();

    audio.addEventListener("loadeddata",()=>{
        let duration = audio.duration;
        console.log(duration)
    })

}
main()




