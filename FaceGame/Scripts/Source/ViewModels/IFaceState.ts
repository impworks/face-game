interface IFaceState {

    // -----------------------------------
    // Value properties
    // -----------------------------------

    id: number;

    x: number;
    y: number;
    width: number;
    height: number;

    hasMiddleName?: boolean;

    firstName?: string;
    lastName?: string;
    middleName?: string;

    // -----------------------------------
    // State properties
    // -----------------------------------

    isHovered?: boolean;
    isOpen?: boolean;
}