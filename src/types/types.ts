export interface HomeData {
  data: {
    StandardCollection: {
      containers: Container[];
      [key: string]: any;
    };
  };
}

export interface Container {
    set: {
        items: Tile[]; 
        [key: string]: any;
    }; 
    [key: string]: any;
}

// represents an item (tile)
export interface Tile {
    contentId: string;
    seriesId?: string;
    programId?: string; 
    currentAvailability: {
        region: string; 
        kidsMode: boolean;
    }; 
    image: Image;
    videoArt: VideoArt[]; 
    type: string; 
    releases: {
        releaseDate: string; 
        releaseType: string; 
        releaseYear: number; 
        territory: any;
    }[];
    [key: string]: any;
}

export interface Image {
    tile?: {
        [key: string]: { // expects aspect ratio key 
            [key: string]: {
                default: {
                    masterId: string;
                    masterWidth: string;
                    masterHeight: string; 
                    url: string; 
                };
            };
        };
    };
    [key: string]: any;
}

export interface VideoArt {
  purpose: string;
  mediaMetadata: {
    urls: { url: string }[];
  };
}
