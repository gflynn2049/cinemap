import React, { useEffect, useState } from "react";
import { ProjectorFilterOptions, ProjectorFilterOptionsList, buildFilterFunction } from "../ProjectorsData";
import { useTranslation } from "react-i18next";
import { filterTheatres } from "../Store";
import { useMapContext } from "./MapContext";
import { FloatControl } from "./FloatControl";

const Filter = (props: {
    about: boolean;
    setAbout: (val: boolean) => void;
}) => {
    const { map } = useMapContext();
    const [displayDolby, setDisplayDolby] = useState<boolean>(true);
    const [displayImax, setDisplayImax] = useState<boolean>(true);
    const [useFilter, setUseFilter] = useState<boolean>(false)

    const initialFilters = ProjectorFilterOptionsList.reduce((acc, filter) => {
        return { ...acc, [filter]: false };
    }, {});

    const [projectorFilters, setProjectorFilters] = useState<ProjectorFilterOptions>(initialFilters);

    const handleProjectorFilterChange = (filter: string) => {
        setProjectorFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: !prevFilters[filter as keyof ProjectorFilterOptions],
        }));
    };

    useEffect(() => {
        if (map?.current) {
            const source = map.current.getSource("source");
            if (source) {
                let filterFunc = null
                if (useFilter) {
                    filterFunc = buildFilterFunction(projectorFilters);
                }
                source.setData(filterTheatres(displayDolby, displayImax, filterFunc));
            }
        }
    }, [useFilter, projectorFilters, displayDolby, displayImax]);

    const { t, i18n } = useTranslation();
    return (
        <div className="flex justify-center">
            <div
                style={{ zIndex: '1' }}
                className={"absolute flex justify-center top-0 font-medium w-11/12 max-w-2xl text-base mt-5 p-3 shadow sm:rounded-full rounded-2xl tracking-tight text-gray-800 dark:text-white backdrop-blur-md bg-white/40 shadow dark:bg-gray-900/30"}
            >
                <div className="rounded max-w-xl justify-center items-center sm:flex">
                    <div className="flex items-center gap-2 sm:mr-5">
                        {/* filter switch */}
                        <label className="relative inline-flex items-center w-fit cursor-pointer">
                            <input type="checkbox"
                                checked={useFilter}
                                onChange={() => setUseFilter(!useFilter)}
                                className="sr-only peer" />
                            <div className="w-9 h-5 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-400 
                            rounded-full peer bg-gray-600 dark:bg-gray-600 peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] 
                            after:absolute after:top-[2px] after:start-[2px] after:absolute  
                            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 
                            after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="">{t("filterProjector")}</span>
                    </div>


                    <div className="flex gap-3 mt-3 sm:mt-0">
                        {ProjectorFilterOptionsList.map((filter) => (
                            <label key={filter} className={"transition flex justify-center items-center"}>
                                <input
                                    type="checkbox"
                                    disabled={!useFilter}
                                    checked={!!projectorFilters[filter as keyof ProjectorFilterOptions]}
                                    onChange={() => handleProjectorFilterChange(filter)}
                                    className="mr-0.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                {t(filter)}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <FloatControl
                displayDolby={displayDolby}
                setDisplayDolby={() => setDisplayDolby(!displayDolby)}
                displayImax={displayImax}
                setDisplayImax={() => setDisplayImax(!displayImax)}
                about={props.about}
                setAbout={props.setAbout}
            />
        </div >
    );
};

export default Filter;