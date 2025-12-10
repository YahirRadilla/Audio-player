import { useState } from "react"
import { playlist } from "./assets/data"
import AudioPlayer from "./components/audio-player/AudioPlayer"
import SongItem from "./components/playlist/SongItem"




function App() {
  const [currentSong, setCurrentSong] = useState(playlist[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <h1>DASC UABCS - MP3 Player</h1>
      {
        playlist.map((song) => (
          <SongItem {...song} isActive={song.id === currentSong.id && isPlaying} key={song.id} onPlay={() => setCurrentSong(song)} />
        ))
      }
      <AudioPlayer currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </>
  )
}

export default App
