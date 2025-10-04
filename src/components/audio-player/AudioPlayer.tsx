import { useEffect, useRef, useState } from "react"
import "../../styles/globalStyles.css"
import VolumeControl from "./VolumeControl"
import ProgressControl from "./ProgressControl"


export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioElement = useRef<HTMLAudioElement | null>(null)


    const handlePlay = () => {
        audioElement.current?.play()
        setIsPlaying(true)
    }

    const handlePause = () => {
        audioElement.current?.pause()
        setIsPlaying(false)
    }

    useEffect(() => {
        const audio = audioElement.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const setAudioDuration = () => setDuration(audio.duration)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", setAudioDuration)
        audio.addEventListener("ended", () => setIsPlaying(false))


        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", setAudioDuration)
        }
    }, [])




    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60).toString().padStart(2, "0")
        return `${minutes}:${seconds}`
    }

    return (

        <>
            <div className="audio-player">
                <title>TITLE - This is the title</title>
                <div className="controls">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /><path d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /></svg>
                    </button>
                    <button onClick={isPlaying ? handlePause : handlePlay}>
                        {
                            isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor"  ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>
                        }
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /><path d="M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /></svg>
                    </button>

                    <ProgressControl audioElement={audioElement} />

                    <VolumeControl audioElement={audioElement} />

                    <p className="time">{formatTime(currentTime)} / {formatTime(duration)}</p>

                    <audio className="hidden" ref={audioElement} controls src="./cancion.mp3"></audio>
                </div>
            </div>
        </>
    )
}
