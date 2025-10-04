import { useEffect, useRef, useState } from "react";


export default function VolumeControl({ audioElement }: { audioElement: React.RefObject<HTMLAudioElement | null> }) {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [volume, setVolume] = useState(50);


    const handleChange = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        let pct = 1 - (e.clientY - rect.top) / rect.height;
        pct = Math.max(0, Math.min(1, pct));
        setVolume(Math.round(pct * 100));


    };

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.volume = volume / 100;
        }
    }, [audioElement, volume]);



    return (
        <div className="volume-container">
            <button className="volume-button" aria-label="Volumen">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-volume"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /></svg>
            </button>

            <div
                ref={barRef}
                className="volume-bar"
                role="slider"
                aria-orientation="vertical"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={volume}
                onPointerDown={handleChange}
                onPointerMove={(e) => e.buttons === 1 && handleChange(e)}
            >
                <div
                    className="volume-fill"
                    style={{ height: `${volume}%` }}
                ></div>
            </div>
        </div>
    );
}
