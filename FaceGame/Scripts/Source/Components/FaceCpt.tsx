/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import TextInputCpt from "./TextInputCpt";
import DragHandle from "./DragHandle";
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

        var face = this.state.face;
        var blockStyles = {
            left: face.x1,
            top: face.y1,
            width: face.x2 - face.x1,
            height: face.y2 - face.y1
        };

        var blockClasses = this.getOverlayClasses();
        var popover = this.renderPopover();

        var canDesign = face.isDesignMode && face.firstNameState == null;

        return (
            <div>
                <ReactBootstrap.OverlayTrigger rootClose={true} placement="bottom" trigger="click" overlay={popover}>
                    <div className={blockClasses}
                         style={blockStyles}
                         onMouseOver={this.onMouseOver.bind(this)}
                         onMouseOut={this.onMouseOut.bind(this)} />
                </ReactBootstrap.OverlayTrigger>
                {
                    canDesign &&
                    <DragHandle object={this.state.face} onUpdate={this.onMove.bind(this) } xProp="x1" yProp="y1" otherXProp="x2" otherYProp="y2" />
                }
                {
                    canDesign &&
                    <DragHandle object={this.state.face} onUpdate={this.onMove.bind(this) } xProp="x2" yProp="y2" />
                }
            </div>
        );
    }

    private renderPopover(): JSX.Element {

        /// <summary>Renders the clickable popover.</summary>

        var face = this.state.face;
        var canSave = face.firstNameState == null && face.lastName == null;

        return <ReactBootstrap.Popover id="face-popover">
            <form className="form-horizontal " onSubmit={this.onSave.bind(this) }>
                <TextInputCpt title="Фамилия" value={face.lastName} state={face.lastNameState} disabled={this.state.isProcessing} onChange={v => face.lastName = v}/>
                <TextInputCpt title="Имя" value={face.firstName} state={face.firstNameState} disabled={this.state.isProcessing} onChange={v => face.firstName = v}/>
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

    private getOverlayClasses(): string {
        var detected = this.props.face.firstNameState;
        var isHovered = this.state.isHovered;
        var classes = [
            'face',
            detected == null ? 'face-new' : 'face-identified',
            isHovered ? 'hovered' : ''
        ];

        return classes.join(' ');
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

    private onMove() {
        this.updateState(() => {});
    }

    private onSave(e: Event) {
        e.preventDefault();

        this.updateState(x => x.isProcessing = true);
        if (this.props.onSave) {
            this.props.onSave(this.state.face)
                .then(response => {
                    this.updateState(state => {
                        state.isProcessing = false;
                        state.face.firstNameState = !response || response.isFirstNameCorrect;
                        state.face.lastNameState = !response || response.isLastNameCorrect;
                        state.face.middleNameState = !response || response.isMiddleNameCorrect;
                    });
                });
        }
    }
}