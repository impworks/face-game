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

        /// <summary>Renders the face component.</summary>

        var blockStyles  = {
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height
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

        return <ReactBootstrap.Popover id="face-popover" title="Детали">
                   <form className="form-horizontal " onSubmit={this.onSave.bind(this) }>
                    {this.renderInputField('Имя', this.state.firstName, this.state.firstNameState) }
                    {this.renderInputField('Фамилия', this.state.lastName, this.state.lastNameState) }
                    {this.state.hasMiddleName && this.renderInputField('Отчество', this.state.middleName, this.state.middleNameState) }
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

    private renderInputField(title: string, value: string, state: boolean): JSX.Element {

        /// <summary>Renders an input field in the popover.</summary>

        var groupClasses = "form-group";
        var icon = null as JSX.Element;

        if (typeof state !== "undefined") {
            groupClasses += ` has-feedback has-${state ? "success" : "error"}`;
            var iconClasses = `glyphicon glyphicon-${state ? "ok" : "remove"} form-control-feedback`;
            icon = <span className={iconClasses} />;
        }

        return <div className={groupClasses}>
                   <label className="control-label col-sm-4">{title}</label>
                   <div className="col-sm-8">
                       <input type="text" className="form-control" value={this.state.firstName}/>
                   </div>
                   {icon}
               </div>;
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
        console.log('save');
    }
}