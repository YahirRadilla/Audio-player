import { useEffect, useRef, useState } from "react";


export default function ProgressControl({ audioElement }: { audioElement: React.RefObject<HTMLAudioElement | null> }) {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);


    const handleChange = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!barRef.current || !audioElement.current) return
        const rect = barRef.current.getBoundingClientRect()
        let pct = (e.clientX - rect.left) / rect.width
        pct = Math.max(0, Math.min(1, pct))
        setProgress(Math.round(pct * 100))
        audioElement.current.currentTime = pct * audioElement.current.duration
    }

    useEffect(() => {
        const audio = audioElement.current
        if (!audio) return
        const updateTime = () => {
            const pct = (audio.currentTime / audio.duration) * 100
            setProgress(pct)
        }
        audio.addEventListener("timeupdate", updateTime)
        return () => audio.removeEventListener("timeupdate", updateTime)
    }, [audioElement])

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.currentTime = progress / 100;
        }
    }, [audioElement]);



    return (
        <div className="progress-container">

            <div
                ref={barRef}
                className="progress-bar"
                role="slider"
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                onPointerDown={handleChange}
                onPointerMove={(e) => e.buttons === 1 && handleChange(e)}
            >
                <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
