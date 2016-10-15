/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import TextInputCpt from "./TextInputCpt";
import { IFaceState } from "../ViewModels/IFaceState";
import { IIdentificationResponse } from "../ViewModels/IIdentificationResponse";

interface IFaceCptProperties extends React.Props<FaceCpt> {
    face: IFaceState;
    onSave: (face: IFaceState) => JQueryPromise<IIdentificationResponse>;
}

interface IFaceIntermediateState {
    face: IFaceState;

    isProcessing: boolean;
    isHovered: boolean;
}

export default class FaceCpt extends ComponentBase<IFaceCptProperties, IFaceIntermediateState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IFaceCptProperties) {
        super(props);

        this.state = {
            face: props.face,

            isProcessing: true,
            isHovered: false
        };
    }

    // -----------------------------------
    // Rendering
    // -----------------------------------

    render(): JSX.Element {

        /// <summary>Renders the face component.</summary>

        var blockStyles = {
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
                    onMouseOver={this.onMouseOver.bind(this) }
                    onMouseOut={this.onMouseOut.bind(this) } />
            </ReactBootstrap.OverlayTrigger>
        );
    }

    private renderPopover(): JSX.Element {

        /// <summary>Renders the clickable popover.</summary>

        var face = this.state.face;
        var canSave = face.firstNameState == null && face.lastName == null;
        return <ReactBootstrap.Popover id="face-popover">
            <form className="form-horizontal " onSubmit={this.onSave.bind(this) }>
                <TextInputCpt title="Имя" value={face.firstName} state={face.firstNameState} disabled={this.state.isProcessing} onChange={v => face.firstName = v}/>
                <TextInputCpt title="Фамилия" value={face.lastName} state={face.lastNameState} disabled={this.state.isProcessing} onChange={v => face.lastName = v}/>
                {
                    face.hasMiddleName &&
                    <TextInputCpt title="Отчество" value={face.middleName} state={face.middleNameState} disabled={this.state.isProcessing} onChange={v => face.middleName = v}/>
                }
                {
                    canSave &&
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
                }
            </form>
        </ReactBootstrap.Popover>;
    }

    // -----------------------------------
    // Private handlers
    // -----------------------------------

    private onMouseOver() {
        this.updateState(x => x.isHovered = true);
    }

    private onMouseOut() {
        this.updateState(x => x.isHovered = false);
    }

    private setPty(name: string, value: any) {
        var newState = _.extend({}, this.state);
        newState[name] = value;
        this.setState(newState);
    }

    private onSave(e: Event) {
        e.preventDefault();

        this.updateState(x => x.isProcessing = true);
        if (this.props.onSave) {
            this.props.onSave(this.state.face)
                .then(response => {
                    this.updateState(state => {
                        state.isProcessing = false;
                        state.face.firstNameState = response.isFirstNameCorrect;
                        state.face.lastNameState = response.isLastNameCorrect;
                        state.face.middleNameState = response.isMiddleNameCorrect;
                    });
                });
        }
    }
}