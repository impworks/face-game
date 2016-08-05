/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
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

        var popover = (
            <ReactBootstrap.Popover id="popover" title="Детали">
                <form className="form-horizontal" onSubmit={this.onSave.bind(this)}>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="">Имя</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" value={this.state.firstName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="">Фамилия</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" value={this.state.lastName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <div className="pull-right">
                                <ReactBootstrap.Button type="submit" className="btn btn-primary">
                                    Сохранить
                                </ReactBootstrap.Button>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                </form>
            </ReactBootstrap.Popover>
        );

        return (
            <ReactBootstrap.OverlayTrigger rootClose={true} placement="bottom" trigger="click" overlay={popover}>
                <div className={classes}
                     style={styles}
                     onMouseOver={this.onMouseOver.bind(this)}
                     onMouseOut={this.onMouseOut.bind(this) } />
            </ReactBootstrap.OverlayTrigger>
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

    private onSave() {
        console.log('save');
    }
}