export type Song = {
    id: number;
    title: string;
    artist: string;
    url?: string;
    isActive?: boolean;
    onPlay?: (id: string) => void;
    onDelete?: (id: string) => void;
}