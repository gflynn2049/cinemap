import React from 'react'

import { Theatre } from '../types';
import { useMapContext } from './MapContext';

export const ListItem = (props: {
    searchResult: any
    setDisplaySearch: () => void
    setCurrent: (theatre: Theatre) => void
}) => {
    const coordinates = props.searchResult.geometry.coordinates.slice();
    const properties = props.searchResult.properties;
    const { map } = useMapContext();

    return (
        <div
            className="p-2 rounded my-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm leading-2 cursor-pointer break-words"
            onClick={() => {
                props.setDisplaySearch()
                props.setCurrent({ coordinates, properties });
                map.current.flyTo({
                    center: coordinates,
                    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                    zoom: 12
                });
            }}
        >
            <h1 className="font-medium text-gray-900 dark:text-gray-200">{properties.theatre}</h1>
            <p className=" text-xs">
                <div className="text-gray-700 dark:text-gray-300">{properties.projectorsArray.join(', ')}</div>
                {properties.note && (
                    <div className="text-gray-500  dark:text-gray-300">{properties.note}</div>
                )}
            </p>
        </div>
    )
}
