import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next";
import { fuse } from "../Store"
import { ListItem } from "./ListItem";
import { Theatre } from "../types";
const Search = (
    props: {
        displaySearch: boolean;
        setDisplaySearch: (val: boolean) => void;
        setCurrent: (theatre: Theatre | null) => void
    }
) => {
    const { t, i18n } = useTranslation();

    const ref = useRef<HTMLInputElement | null>(null)
    const [searchString, setSearchString] = useState<string>("")
    const [searchResult, setSearchResult] = useState<{ item: any, refIndex: number }[]>([])

    useEffect(() => {
        setSearchResult(fuse.search(searchString))
    }, [searchString])

    useEffect(() => {
        if (ref.current && props.displaySearch)
            ref.current?.focus()
    }, [])

    return (<div className="max-h-96 overflow-y-auto overflow-x-hidden relative top-5 shadow bg-white/95 rounded-2xl dark:bg-gray-700">
        <div className="p-3 space-y-1 w-full text-sm text-gray-700 dark:text-gray-200">
            <div
                style={{ minWidth: "18rem" }}>
                <div className="flex w-full p-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-400 transition">
                    <input
                        ref={ref}
                        value={searchString}
                        onChange={e => setSearchString(e.target.value)}
                        placeholder={t("search")}
                        className="px-2 outline-none w-full bg-white dark:text-white dark:bg-gray-600 p-1 rounded"
                    />
                </div>
            </div>
            <div className="overflow-y-auto max-w-lg pt-1">
                {
                    (searchString.length > 0)
                        ? searchResult && searchResult.length > 0
                            ? searchResult.map(i => <ListItem setCurrent={props.setCurrent} key={i.refIndex} searchResult={i.item} setDisplaySearch={() => props.setDisplaySearch(false)} />)
                            : <div className="p-3 text-sm text-gray-400 text-center">{t("noResult")}</div>
                        : <div className="p-3 text-sm text-gray-400 text-center">{t("typeToSearch")}</div>
                }
            </div>
        </div>

    </div>)
}

export default Search