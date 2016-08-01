/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />

interface IFaceCptProperties extends React.Props<FaceCpt> {
    face: IFaceState;
}

export default class FaceCpt extends React.Component<IFaceCptProperties, IFaceState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IFaceCptProperties) {
        super(props);

        this.state = props.face;
    }

    // -----------------------------------
    // Rendering
    // -----------------------------------

    render(): JSX.Element {
        var styles  = {
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height
        };
        var classes = `face ${this.state.isHovered ? 'hovered' : ''}`;

        return (
            <div className={classes}
                 style={styles}
                 onMouseOver={this.onMouseOver.bind(this)}
                 onMouseOut={this.onMouseOut.bind(this)} />
        );
    }

    // -----------------------------------
    // Private handlers
    // -----------------------------------

    private onMouseOver() {
        this.setPty('isHovered', true);
    }

    private onMouseOut() {
        this.setPty('isHovered', false);
    }

    private setPty(name: string, value: any) {
        var newState = _.extend(this.state, { [name]: value });
        this.setState(newState);
    }
}