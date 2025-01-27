export interface Country {
    name: string;
    capital?: string;
    area: number;
    languages?: string[];
    flags: Flags;
}

interface Flags {
    png: string
    svg: string
    alt?: string
}