/// <reference path="../../Typings/react-global.d.ts" />

export default class ComponentBase<TProps, TState> extends React.Component<TProps, TState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props?: TProps) {
        super(props);
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    updateState(handler: (newState: TState) => void) {
        var newState = _.extend({}, this.state);
        handler(newState);
        this.setState(newState);
    }
}