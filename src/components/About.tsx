import clsx from "clsx";
import React from "react"
import lastUpdated from "../lastUpdated.json"
import { useTranslation } from "react-i18next";

const About = (
    props: {
        about: boolean
        setAbout: () => void
        setDisplayFilter: () => void;
        setDisplaySearch: () => void;
    }
) => {
    const { t, i18n } = useTranslation();

    const formattedLastUpdate = new Date(lastUpdated.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <div
            className="absolute bottom-0 w-full justify-center flex"
            onClick={() => { props.setDisplayFilter(); props.setDisplaySearch() }}>
            <div
                className={clsx(
                    "detail backdrop-blur-md bg-white/80 border-t border-l border-r border-gray-200 shadow dark:bg-gray-800/80 dark:border-gray-700",
                    props.about && "show"
                )}
            >
                <div className="text-sm leading-loose text-gray-900 dark:text-white">
                    <div>{t("dataSource")}: @ArvinTingcn, <a className="underline" target="blank" href="https://docs.google.com/spreadsheets/d/1m55a9PwrQ_4aPjbQ19htpwiAeHZ8RB7IcV0KWOB_7Bk/">Dolby Cinema Database</a></div>
                    <div>{t("lastUpdated")}: {formattedLastUpdate}</div>
                    <div>{t("madeBy")}: @<a className="underline" href="https://gflynn2049.vercel.app/" target="blank">gflynn2049</a></div>
                    <div>{t("sourceCode")}: <a href="https://github.com/gflynn2049/CineMap" className="underline" target="blank">GitHub</a></div>
                    <div>{t("thanks")}: @白龙 @Ve</div>
                </div>
            </div>
        </div >)
}
export default About