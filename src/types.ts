export interface Theatre {
  coordinates: [number, number];
  properties: {
    theatre: string,
    type: 'imax' | 'dolby',
    date: string,
    width: string,
    height: string,
    size: string,
    seats: string,
    note: string,
    projectorsArray: string[],
  };
}
