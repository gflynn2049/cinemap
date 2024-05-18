export interface Theatre {
  coordinates: [string, string];
  properties: {
    theatre: string;
    type: "imax" | "dolby";
    date: string;
    width: string;
    height: string;
    size: string;
    seats: string;
    note: string;
    projectorsArray: string[];
  };
}
