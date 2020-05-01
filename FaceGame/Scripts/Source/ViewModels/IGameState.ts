import { IFaceState } from "./IFaceState";

export interface IGameState {
    name: string;
    faces: IFaceState[];
    score?: number;
    isFinished?: boolean;
}