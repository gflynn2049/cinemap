import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMapContext } from "./MapContext";
import {
  ProjectorFilterOptions,
  ProjectorFilterOptionsList,
  ProjectorTypeInfo,
  IProjectorTypeInfo,
  buildFilterFunction,
} from "../ProjectorsData";
import { filterTheatres } from "../Store";
import Search from "./Search";
import { Theatre } from "../types";

const Nav = (props: {
  displayDolby: boolean;
  displayImax: boolean;
  displaySearch: boolean;
  setDisplaySearch: (val: boolean) => void;
  about: boolean;
  setAbout: (val: boolean) => void;
  displayFilter: boolean;
  setDisplayFilter: (val: boolean) => void;
  setCurrent: (theatre: Theatre | null) => void;
  setProjectorFilters: (filters: ProjectorFilterOptions) => void;
  setUseFilter: (val: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const { map } = useMapContext();
  const [useFilter, setUseFilter] = useState<boolean>(false);
  const [filterCount, setFilterCount] = useState<number>(0);
  const initialFilters = ProjectorFilterOptionsList.reduce((acc, filter) => {
    return { ...acc, [filter]: true };
  }, {});

  const [projectorFilters, setProjectorFilters] =
    useState<ProjectorFilterOptions>(initialFilters);

  const handleProjectorFilterChange = (filter: string) => {
    setProjectorFilters(prevFilters => ({
      ...prevFilters,
      [filter]: !prevFilters[filter as keyof ProjectorFilterOptions],
    }));
  };
  const changeLanguage = () => {
    const prevLang = i18n.language;

    const propertiesToChange = [
      "country-label",
      "continent-label",
      "state-label",
      "settlement-major-label",
      "settlement-minor-label",
      "settlement-subdivision-label",
      "airport-label",
      "transit-label",
      "poi-label",
      "road-label-simple",
      "block-number-label",
      "building-number-label",
      "building-entrance",
    ];

    propertiesToChange.map(property => {
      map.current.setLayoutProperty(property, "text-field", [
        "get",
        `name_${prevLang === "en" ? "zh-Hans" : "en"}`,
      ]);
    });

    i18n.changeLanguage(prevLang === "en" ? "zh" : "en");
  };

  useEffect(() => {
    if (map?.current) {
      const source = map.current.getSource("source");
      if (source) {
        let filterFunc = null;
        if (useFilter) {
          setFilterCount(
            Object.values(projectorFilters).filter(value => value === true)
              .length
          );
          filterFunc = buildFilterFunction(projectorFilters);
        }
        props.setProjectorFilters(projectorFilters)
        props.setUseFilter(useFilter)
        source.setData(
          filterTheatres(props.displayDolby, props.displayImax, filterFunc)
        );
      }
    }
  }, [map, useFilter, projectorFilters, props.displayDolby, props.displayImax]);

  const checkboxStyle = `w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 
    dark:bg-gray-600 dark:border-gray-500`;

  return (
    <div
      style={{ zIndex: 1002 }}
      className="absolute w-full justify-center items-center flex"
    >
      <div
        style={{ width: "94%" }}
        className={`relative transition justify-center items-center flex max-w-4xl text-sm font-normal mt-3 py-2 px-2 shadow sm:rounded-full rounded-xl 
                text-black dark:text-white backdrop-blur-md shadow dark:bg-gray-900/80 ${
                  props.about || props.displayFilter || props.displaySearch
                    ? "bg-white/80"
                    : "bg-white/40"
                }`}
      >
        {/* main container */}
        <div className="relative w-full max-w-2xl items-center justify-between flex">
          {/* left sub container */}
          <div className="flex-1 h-10 flex w-full relative">
            {/* search */}
            <div className="absolute left-3 top-3 transition">
              <button
                className="cursor-pointer"
                onClick={() => {
                  props.setDisplaySearch(!props.displaySearch);
                  props.setDisplayFilter(false);
                  props.setAbout(false);
                  props.setCurrent(null);
                }}
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
            {/* projector filter */}
            <div className="max-w-full">
              <button
                className="ml-12 p-2.5 text-black focus:ring-2 focus:outline-none focus:ring-gray-400/40 dark:focus:ring-gray-200/70 font-medium rounded-lg 
                              dark:text-white transition cursor-pointer inline-flex items-center "
                type="button"
                onClick={() => {
                  props.setDisplayFilter(!props.displayFilter);
                  props.setAbout(false);
                  props.setCurrent(null);
                  props.setDisplaySearch(false);
                }}
              >
                {filterCount != null && useFilter
                  ? `${t("filterProjector")} (${filterCount})`
                  : t("filterProjector")}
                <svg
                  className="w-2.5 h-2.5 ms-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* dropdown menu */}
              {props.displaySearch && (
                <Search
                  setCurrent={props.setCurrent}
                  displaySearch={props.displaySearch}
                  setDisplaySearch={props.setDisplaySearch}
                />
              )}

              {props.displayFilter && (
                <div className="relative top-5 shadow bg-white divide-y divide-gray-200 rounded-2xl w-fit max-w-lg dark:bg-gray-700 dark:divide-gray-600">
                  <div className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                    <div className="flex p-1 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={!useFilter}
                          onChange={() => setUseFilter(!useFilter)}
                          className={checkboxStyle}
                        />
                      </div>
                      <div className="ms-2 text-sm">
                        <label className="font-medium text-gray-900 dark:text-gray-200">
                          <div>{t("displayAll")}</div>
                          <p className="text-xs font-light text-gray-500 dark:text-gray-300">
                            {t("displayAllNote")}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* projector filters */}
                  <ul className="p-3 space-y-0.5 text-sm text-gray-700 dark:text-gray-200">
                    {ProjectorFilterOptionsList.map((filter, index) => (
                      <li key={index}>
                        <div className="flex p-1 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              disabled={!useFilter}
                              checked={
                                !!projectorFilters[
                                  filter as keyof ProjectorFilterOptions
                                ]
                              }
                              onChange={() =>
                                handleProjectorFilterChange(filter)
                              }
                              className={checkboxStyle}
                            />
                          </div>
                          <div className="ms-2 text-sm">
                            <label
                              key={filter}
                              className="font-medium text-gray-900 dark:text-gray-200"
                            >
                              <div>{t(filter)}</div>
                              <p
                                className="text-xs font-light text-gray-500 
                                            dark:text-gray-300"
                              >
                                {
                                  ProjectorTypeInfo[
                                    filter as keyof IProjectorTypeInfo
                                  ]
                                }
                              </p>
                            </label>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* right sub container */}
          <div className="absolute right-3 text-sm font-medium items-center flex gap-6">
            {/* language switch */}
            <button
              className="text-gray-800/50 dark:text-gray-400 cursor-pointer flex gap-0.5"
              onClick={() => changeLanguage()}
            >
              <span
                className={`${
                  i18n.language == "zh" && "dark:text-gray-200 text-gray-900"
                }`}
              >
                简
              </span>
              /
              <span
                className={`${
                  i18n.language == "en" && "dark:text-gray-200 text-gray-900"
                }`}
              >
                EN
              </span>
            </button>

            {/* about */}
            <button
              className="text-gray-900 dark:text-gray-200  cursor-pointer"
              onClick={() => {
                props.setAbout(!props.about);
                props.setDisplayFilter(false);
                props.setCurrent(null);
              }}
            >
              {t("about")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
