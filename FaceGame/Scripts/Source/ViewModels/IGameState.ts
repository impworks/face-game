import { IFaceState } from "./IFaceState";

export interface IGameState {
    faces: IFaceState[];
    score?: number;
    isFinished?: boolean;
}