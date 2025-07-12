export interface HomeData {
  data: {
    StandardCollection: {
      containerssss: Container[];
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
    [key: string]: any;
}

export interface Image {
    tile?: {
        [key: string]: { // expects aspect ratio key 
            [key: string]: { // for either 'series' or 'program'
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
