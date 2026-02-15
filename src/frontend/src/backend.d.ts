import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlantInfo {
    name: string;
    type: string;
    environment: string;
    symptoms: Array<string>;
    wateringHabits: string;
}
export interface Diagnosis {
    treatment: string;
    careRecommendations: string;
    issue: string;
}
export interface backendInterface {
    getAllDiagnoses(): Promise<Array<Diagnosis>>;
    getDiagnosis(): Promise<Diagnosis>;
    searchDiagnosesByIssue(issue: string): Promise<Array<Diagnosis>>;
    submitPlantInfo(plantInfo: PlantInfo): Promise<Diagnosis>;
}
