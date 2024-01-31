console.log("Here We go")

let currentSong = new Audio();
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

const playMusic =(track)=>{
    // let audio = new Audio("/songs/"+ track)
    currentSong.src= "/songs/" + track
    currentSong.play()
}

async function main() {

    
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        let songname= `${song.replaceAll("%20"," ").replaceAll("[NCS Release].mp3","").replaceAll(/\([^)]*\)/g, '')} `
        songUL.innerHTML = songUL.innerHTML + `<li>
                        <img class="music-svg" src="assets/music.svg" alt="">
                        <div class="song-artist">
                            <div class="song-name" data-song ="${song}"> ${songname}
                            </div>
                            <div class="artist-name">
                            </div>
                        </div>
                        <div >
                            <img class="playsvg " src="assets/play.svg" alt="">
                        </div>
                        </li>`;
        
    }
    //linking Event listner to all songs
    Array.from (document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
        console.log(e.querySelector(".song-name").innerHTML)
        playMusic(e.querySelector(".song-name").dataset.song)
    })
    })

    //Adding Event listner for play pause song
    play.addEventListener("click",()=>{
        if (currentSong.paused) {
            currentSong.play()
            play.src ="assets/pause.svg" 
        }else{
            currentSong.pause()
            play.src = "assets/play.svg"
        }
    })
    

}
main()




