import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useMapContext } from "./MapContext";
import { ProjectorFilterOptions, ProjectorFilterOptionsList, ProjectorTypeInfo, buildFilterFunction } from "../ProjectorsData";
import { filterTheatres } from "../Store";

const Nav = (props: {
    displayDolby: boolean;
    displayImax: boolean;
    about: boolean;
    setAbout: (val: boolean) => void;
    displayFilter: boolean;
    setDisplayFilter: (val: boolean) => void
    setCurrent: () => void

}) => {
    const { t, i18n } = useTranslation();
    const { map } = useMapContext();

    const initialFilters = ProjectorFilterOptionsList.reduce((acc, filter) => {
        return { ...acc, [filter]: true };
    }, {});

    const [projectorFilters, setProjectorFilters] = useState<ProjectorFilterOptions>(initialFilters);

    const handleProjectorFilterChange = (filter: string) => {
        setProjectorFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: !prevFilters[filter as keyof ProjectorFilterOptions],
        }));
    };
    const changeLanguage = () => {
        const prevLang = i18n.language;

        const propertiesToChange = [
            'country-label',
            'continent-label',
            'state-label',
            'settlement-major-label',
            'settlement-minor-label',
            'settlement-subdivision-label',
            'airport-label',
            'transit-label',
            'poi-label',
            'road-label-simple',
            'block-number-label',
            'building-number-label',
            'building-entrance'
        ];

        propertiesToChange.map(property => {
            map.current.setLayoutProperty(property, 'text-field', [
                'get',
                `name_${prevLang === 'en' ? 'zh-Hans' : 'en'}`
            ]);
        });

        i18n.changeLanguage(prevLang === 'en' ? 'zh' : 'en');
    };

    useEffect(() => {
        if (map?.current) {
            const source = map.current.getSource("source");
            if (source) {
                let filterFunc = null

                filterFunc = buildFilterFunction(projectorFilters)

                source.setData(filterTheatres(props.displayDolby, props.displayImax, filterFunc));
            }
        }
    }, [projectorFilters, props.displayDolby, props.displayImax]);

    return (
        <div
            style={{ zIndex: 1002 }}
            className="absolute w-full justify-center items-center flex">
            <div
                className="relative justify-center items-center flex w-11/12 max-w-4xl text-sm font-normal mt-3 py-2 px-2 shadow sm:rounded-full rounded-2xl text-black dark:text-white backdrop-blur-md bg-white/40 shadow dark:bg-gray-900/80"
            >
                <div className="relative w-full max-w-2xl items-center justify-between flex">
                    <div className="flex-1 h-10">
                        <button
                            className="p-2.5 text-black focus:ring-2 focus:outline-none focus:ring-gray-400/40 dark:focus:ring-gray-200/70 font-bold rounded-lg 
                              dark:text-white transition cursor-pointer inline-flex items-center "
                            type="button"
                            onClick={() => { props.setDisplayFilter(!props.displayFilter); props.setAbout(false); props.setCurrent() }}>
                            {t("filterProjector")}
                            <svg className="w-2.5 h-2.5 ms-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {/* dropdown menu */}
                        {props.displayFilter &&
                            <div
                                className="relative top-4 shadow bg-white/60 backdrop-blur-md divide-y divide-gray-200 rounded-2xl w-fit max-w-lg dark:bg-gray-700 dark:divide-gray-600">
                                {/* projector filters */}
                                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                    {ProjectorFilterOptionsList.map((filter) => (<li>
                                        <div className="flex p-1.5 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    checked={!!projectorFilters[filter as keyof ProjectorFilterOptions]}
                                                    onChange={() => handleProjectorFilterChange(filter)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                            </div>
                                            <div className="ms-2 text-sm">
                                                <label key={filter} className="font-medium text-gray-900 dark:text-gray-200">
                                                    <div>{t(filter)}</div>
                                                    <p className="text-xs font-light text-gray-500 
                                            dark:text-gray-300">{ProjectorTypeInfo[filter as keyof ProjectorTypeInfo]}</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>))
                                    }
                                </ul>
                            </div>
                        }
                    </div>

                    <div className="text-sm font-medium gap-3 flex mr-2.5">
                        <button
                            className="text-gray-800/50 dark:text-gray-400 cursor-pointer flex gap-0.5"
                            onClick={() => changeLanguage()}
                        >
                            <span className={`${i18n.language == 'zh' && 'dark:text-gray-200 text-gray-900'}`}>简</span>/<span className={`${i18n.language == 'en' && 'dark:text-gray-200 text-gray-900'}`}>EN</span>
                        </button>
                        <button className="text-gray-900 dark:text-gray-200  cursor-pointer"
                            onClick={() => { props.setAbout(!props.about); props.setDisplayFilter(false); props.setCurrent() }}>
                            {t("about")}
                        </button>

                    </div>

                </div>
            </div>

        </div >

    )
}

export default Nav