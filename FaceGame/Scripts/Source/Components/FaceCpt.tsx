/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />

import TextInputCpt from "./TextInputCpt";
import { IFaceState } from "../ViewModels/IFaceState";

interface IFaceCptProperties extends React.Props<FaceCpt> {
    face: IFaceState;
    onSave: (face: IFaceState) => void;
}

interface IFaceIntermediateState {
    face: IFaceState;

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

        var face = this.state.face;
        return <ReactBootstrap.Popover id="face-popover">
                   <form className="form-horizontal " onSubmit={this.onSave.bind(this) }>
                       <TextInputCpt title="Имя" value={face.firstName} state={face.firstNameState} onChange={v => face.firstName = v}/>
                       <TextInputCpt title="Фамилия" value={face.lastName} state={face.lastNameState} onChange={v => face.lastName = v}/>
                       {
                            face.hasMiddleName &&
                            <TextInputCpt title="Отчество" value={face.middleName} state={face.middleNameState} onChange={v => face.middleName = v} />
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

        if (this.props.onSave) {
            this.props.onSave(this.state.face);
        }
    }
}