# CineMap

数据来源 / Data Source: @ArvinTingcn

This project was created with React, TypeScript, and Mapbox API.

## Todo

- [ ] bug: some coordinates converted by Baidu were offset by some numbers. should use some other address -> coordinates transformation
- [ ] feature: add location data (country/city/etc)

## To contribute
1. You'll need your access token from Mapbox to view the map. Here's a .env file example:

```
REACT_APP_MAPBOXGL_ACCESS_TOKEN=YOUR_TOKEN_HERE
```

2. In the project directory, run:

```sh
npm install

# npm postinstall # fetch the data, parse it, and save it to src/data.json

npm start

```