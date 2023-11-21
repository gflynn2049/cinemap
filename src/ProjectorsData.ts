export interface Projector {
    name: string,
    isFilm: boolean | null,
    isLaser: boolean | null,
    isDome: boolean | null,
    is3D: boolean | null,
    isXenon: boolean | null,
    aspectRatio: number | null,
    features: string[]
}

export interface ProjectorFilterOptions {
    isFilm?: boolean;
    isLaser?: boolean;
    isDome?: boolean;
    is3D?: boolean;
    isXenon?: boolean;
    aspectRatio?: number;
    [key: string]: boolean | number | undefined;
}


export const ProjectorFilterOptionsList = [
    "isFilm",
    "isLaser",
    "isDome",
    "is3D",
    "isXenon",
]

export const buildFilterFunction = (projectorFilters: ProjectorFilterOptions) => {
    return (projectorsArray: string[]) => {
        const validProjectors = projectorsData.filter((projector: any) =>
            Object.entries(projectorFilters).filter(([key, val]) => val === true).some(([key, value]) => {
                return projector[key] === projectorFilters[key]
            })
        )
        console.log(validProjectors)

        return projectorsArray.some((projector) =>
            validProjectors.some((p) => p.name === projector)
        );
    };
};

export const projectorsData: Projector[] = [
    { name: "IMAX", isFilm: null, isLaser: null, isDome: null, is3D: null, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX GT", isFilm: true, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: 1.43, features: ["单机双镜头", "15kW氙灯水冷式"] },
    { name: "IMAX GT Dome", isFilm: true, isLaser: false, isDome: true, is3D: false, isXenon: true, aspectRatio: null, features: ["单机特制鱼眼镜头组"] },
    { name: "IMAX GT 3D", isFilm: true, isLaser: false, isDome: false, is3D: true, isXenon: true, aspectRatio: 1.43, features: ["双机双镜头", "2×15kW氙灯水冷式"] },
    { name: "IMAX SR", isFilm: true, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: 1.43, features: ["单机单镜头", "7kW氙灯风冷式光源"] },
    { name: "IMAX SR 3D", isFilm: true, isLaser: false, isDome: false, is3D: true, isXenon: true, aspectRatio: 1.43, features: ["双机双镜头", "2×7kW氙灯风冷式光源"] },
    { name: "IMAX SR Dome", isFilm: true, isLaser: false, isDome: true, is3D: false, isXenon: true, aspectRatio: null, features: ["单机特制鱼眼镜头组"] },
    { name: "IMAX MPX", isFilm: true, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: 1.90, features: ["4×2.4kW氙灯风冷式光源", "单机双镜头"] },
    { name: "IMAX Xenon", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: 1.90, features: ["双机氙灯双镜头"] },
    { name: "IMAX GT 3D Laser", isFilm: false, isLaser: true, isDome: false, is3D: true, isXenon: false, aspectRatio: 1.43, features: ["双机双镜头"] },
    { name: "IMAX GT Laser", isFilm: false, isLaser: true, isDome: false, is3D: false, isXenon: false, aspectRatio: 1.43, features: ["单机双镜头"] },
    { name: "IMAX GT Laser Dome", isFilm: false, isLaser: true, isDome: true, is3D: false, isXenon: false, aspectRatio: null, features: ["单机特制鱼眼镜头组"] },
    { name: "IMAX Commercial Laser", isFilm: false, isLaser: true, isDome: false, is3D: false, isXenon: false, aspectRatio: 1.90, features: ["商业激光", "单机双镜头"] },
    { name: "IMAX Laser XT", isFilm: false, isLaser: true, isDome: false, is3D: false, isXenon: false, aspectRatio: 1.90, features: ["激光XT", "单机单镜头"] },
    { name: "IMAX SR 3D Laser", isFilm: false, isLaser: true, isDome: false, is3D: true, isXenon: false, aspectRatio: null, features: [] },
    { name: "IMAX GT 2D ONLY", isFilm: true, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX GT,2D ONLY", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAXドーム", isFilm: null, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX®デジタルシアター", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX®レーザー", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX®レーザー/GTテクノロジー", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX Laser", isFilm: false, isLaser: true, isDome: false, is3D: false, isXenon: null, aspectRatio: null, features: [] },
    { name: "IMAX 氙灯Gen2", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: null, features: [] },
    { name: "IMAX 氙灯Gen3", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: null, features: [] },
    { name: "IMAX 氙灯Gen1", isFilm: false, isLaser: false, isDome: false, is3D: false, isXenon: true, aspectRatio: null, features: [] },
    { name: "科视Christie E3LH数字影院放映机", isFilm: false, isLaser: true, isDome: false, is3D: true, isXenon: null, aspectRatio: null, features: [] },
];
