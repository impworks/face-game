/// <reference path="../../Typings/react.d.ts" />

interface IInputTextComponentProperties extends React.Props<TextInputCpt> {
    title: string;
    value: string;
    state?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

interface IInputTextComponentState {
    value: string;
}

export default class TextInputCpt extends React.Component<IInputTextComponentProperties, IInputTextComponentState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IInputTextComponentProperties) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    // -----------------------------------
    // Render
    // -----------------------------------

    render(): JSX.Element {
        var groupClasses = "form-group";
        var icon = null as JSX.Element;

        var hasState = this.props.state != null;

        if (hasState) {
            groupClasses += ` has-feedback has-${this.props.state ? "success" : "error"}`;

            var iconClasses = `glyphicon glyphicon-${this.props.state ? "ok" : "remove"} form-control-feedback`;
            icon = <span className={iconClasses} />;
        }

        return <div className={groupClasses}>
                   <label className="control-label col-sm-4">{this.props.title}</label>
                   <div className="col-sm-8">
                       <input type="text"
                              className="form-control"
                              disabled={hasState}
                              readOnly={hasState}
                              value={this.state.value}
                              onChange={this.onInputChange.bind(this)} />
                        {icon}
                   </div>
               </div>;
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    getValue(): string {
        return this.state.value;
    }

    // -----------------------------------
    // Private handlers
    // -----------------------------------

    private onInputChange(e: React.SyntheticEvent) {
        var value = (e.target as HTMLInputElement).value;

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}