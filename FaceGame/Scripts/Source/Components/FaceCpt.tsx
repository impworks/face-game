/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />

import TextInputCpt from "./TextInputCpt";

interface IFaceCptProperties extends React.Props<FaceCpt> {
    face: IFaceState;
}

interface IFaceIntermediateState {
    face: IFaceState;

    firstName: string;
    lastName: string;
    middleName: string;

    isHovered: boolean;
}

export default class FaceCpt extends React.Component<IFaceCptProperties, IFaceIntermediateState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IFaceCptProperties) {
        super(props);

        this.state = {
            face: props.face,

            firstName: props.face.firstName,
            lastName: props.face.lastName,
            middleName: props.face.middleName,

            isHovered: false
        };
    }

    // -----------------------------------
    // Rendering
    // -----------------------------------

    render(): JSX.Element {

        /// <summary>Renders the face component.</summary>

        var blockStyles  = {
            left: this.state.face.x,
            top: this.state.face.y,
            width: this.state.face.width,
            height: this.state.face.height
        };
        var blockClasses = `face ${this.state.isHovered ? 'hovered' : ''}`;
        var popover = this.renderPopover();

        return (
            <ReactBootstrap.OverlayTrigger rootClose={true} placement="bottom" trigger="click" overlay={popover}>
                <div className={blockClasses}
                     style={blockStyles}
                     onMouseOver={this.onMouseOver.bind(this)}
                     onMouseOut={this.onMouseOut.bind(this) } />
            </ReactBootstrap.OverlayTrigger>
        );
    }

    private renderPopover(): JSX.Element {

        /// <summary>Renders the clickable popover.</summary>

        return <ReactBootstrap.Popover id="face-popover">
                   <form className="form-horizontal " onSubmit={this.onSave.bind(this) }>
                       <TextInputCpt title="Имя" value={this.state.firstName} state={this.state.face.firstNameState} onChange={v => this.state.firstName = v}/>
                       <TextInputCpt title="Фамилия" value={this.state.lastName} state={this.state.face.lastNameState} onChange={v => this.state.lastName = v}/>
                       {
                            this.state.face.hasMiddleName &&
                            <TextInputCpt title="Отчество" value={this.state.middleName} state={this.state.face.middleNameState} onChange={v => this.state.middleName = v} />
                       }
                       <div className="form-group">
                           <div className="col-sm-12">
                               <div className="pull-right">
                                   <ReactBootstrap.Button type="submit" className="btn btn-primary">
                                       Сохранить
                                   </ReactBootstrap.Button>
                               </div>
                               <div className="clearfix"/>
                           </div>
                       </div>
                   </form>
               </ReactBootstrap.Popover>;
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

    private onSave(e: Event) {
        e.preventDefault();
        console.log('save: ');
        console.log(this.state);
    }
}