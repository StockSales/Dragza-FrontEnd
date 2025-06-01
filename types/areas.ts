// @/types/area.ts

export interface Area {
    id: string;
    name: string;
    type: "main" | "secondary";
    description: string;
    population: number;
    establishedDate: string;
    isActive: boolean;
}

export type AreaType = "main" | "secondary";

export interface AreaFilters {
    type?: AreaType;
    isActive?: boolean;
    name?: string;
}