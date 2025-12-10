import { useEffect, useRef, useState } from "react"
import "../../styles/globalStyles.css"
import VolumeControl from "./VolumeControl"
import ProgressControl from "./ProgressControl"
import type { Song } from "../../types.ts"
import { playlist } from "../../assets/data.ts"




export default function AudioPlayer({ currentSong, setCurrentSong, isPlaying, setIsPlaying }: { currentSong: Song, setCurrentSong: (song: Song) => void, isPlaying: boolean, setIsPlaying: (isPlaying: boolean) => void }) {

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioElement = useRef<HTMLAudioElement | null>(null)


    const handlePlay = async () => {
        try {
            await audioElement.current?.play();
            setIsPlaying(true);
        } catch (err) {
            console.warn("Play fue bloqueado por el navegador:", err);
        }
    };


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
        audio.addEventListener("ended", () => {

            setCurrentSong(playlist[currentSong.id])
        })


        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", setAudioDuration)
        }
    }, [audioElement, currentSong, setCurrentSong])


    useEffect(() => {
        const audio = audioElement.current;
        if (!audio) return;

        if (currentSong.url) {
            audio.src = currentSong.url;
            audio.load();
            handlePlay();
        }
    }, [currentSong]);





    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60).toString().padStart(2, "0")
        return `${minutes}:${seconds}`
    }

    const handlePrevious = () => {
        const audio = audioElement.current;
        if (!audio) return;

        if (currentSong.id === 1) {
            audio.currentTime = 0;
            audio.play();
            setIsPlaying(true);
            return;
        }

        const previousSong = playlist[currentSong.id - 2];
        if (previousSong) {
            setCurrentSong(previousSong);
        }
    };

    const handleNext = () => {
        const audio = audioElement.current;
        if (!audio) return;

        const lastId = playlist.length;


        if (currentSong.id === lastId) {
            const nextSong = playlist[0];
            setCurrentSong(nextSong);
            return;
        }


        const nextSong = playlist[currentSong.id];
        if (nextSong) {
            setCurrentSong(nextSong);
        }
    };



    return (

        <>
            <div className="audio-player">
                <h3 style={{ textAlign: "center", marginBottom: "0px" }}>{currentSong.title} - {currentSong.artist}</h3>
                <div className="controls">
                    <button onClick={handlePrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /><path d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /></svg>
                    </button>
                    <button onClick={isPlaying ? handlePause : handlePlay}>
                        {
                            isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor"  ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>
                        }
                    </button>
                    <button onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /><path d="M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /></svg>
                    </button>

                    <ProgressControl audioElement={audioElement} />

                    <VolumeControl audioElement={audioElement} />

                    <p className="time">{formatTime(currentTime)} / {formatTime(duration)}</p>

                    <audio
                        className="hidden"
                        ref={audioElement}
                        controls

                        src={currentSong.url}
                    />
                </div>
            </div>
        </>
    )
}
