import type { Song } from "../../types.ts";
import "./songStyles.css"



export default function SongItem({
    id,
    title,
    artist,
    isActive,
    onPlay,
    /* onDelete */
}: Song) {

    return (
        <div
            className={`song-item ${isActive ? "active" : ""}`}
            onClick={() => onPlay!(id.toString())}

        >
            <button className="play-btn">
                {isActive ? "⏸" : "▶"}

            </button>

            <div className="song-info">
                <span className="song-title">{title}</span>
                <span className="song-artist">{artist}</span>
            </div>

            {/* <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete!(id.toString());
                }}
            >
                🗑
            </button> */}
        </div>
    );
}
