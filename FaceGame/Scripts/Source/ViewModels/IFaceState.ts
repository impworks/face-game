export interface IFaceState {

    // -----------------------------------
    // Value properties
    // -----------------------------------

    id: number;

    x1: number;
    y1: number;
    x2: number;
    y2: number;

    hasMiddleName?: boolean;

    firstName?: string;
    lastName?: string;
    middleName?: string;

    firstNameState?: boolean;
    lastNameState?: boolean;
    middleNameState?: boolean;

    isDesignMode?: boolean;
}