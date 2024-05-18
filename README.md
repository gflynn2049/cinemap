# CineMap

数据来源 / Data Source: @ArvinTingcn

This project was created with React, TypeScript, and Mapbox API.

## Before starting

You'll need your access token from Mapbox to view the map. Here's a .env file example:

```
REACT_APP_MAPBOXGL_ACCESS_TOKEN=YOUR_TOKEN_HERE
```

## Scripts

In the project directory, run:

```sh
npm install

# npm postinstall # fetch the data, parse it, and save it to src/data.json

npm start

```

## Todo

- [ ] bug: changing IMAX / Dolby after setting the filter will reset the filter.
  - [ ] either: merge Nav and the FloatControl, or make the filter available for FloatControl
- [ ] bug: language set to EN when page first loaded, however CN is displayed on the map
- [ ] bug: some coordinates converted by Baidu were offset by some numbers. should use some other address -> coordinates transformation
<!-- - [ ] feature: add more filters (15/70, 5/70, etc) -->
- [ ] feature: add location data (country/city/etc)
- [ ] misc: add blank space between 中文 and text in other languages !important
