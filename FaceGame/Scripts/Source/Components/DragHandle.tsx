/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";

interface IDragHandleProps extends React.Props<DragHandle> {
    onUpdate: () => void;
    object: any;
    xProp: string;
    yProp: string;
    otherXProp?: string;
    otherYProp?: string;
}

interface IDragHandleState {
    isDragging: boolean;
    originX?: number;
    originY?: number;
    otherOffsetX?: number;
    otherOffsetY?: number;
    dragStartX?: number;
    dragStartY?: number;
}

export default class DragHandle extends ComponentBase<IDragHandleProps, IDragHandleState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IDragHandleProps) {
        super(props);
        this.state = {
            isDragging: false
        };

        document.addEventListener('mousemove', e => this.onMouseMove(e));
        document.addEventListener('mouseup', e =>  this.onMouseUp(e));
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    render(): JSX.Element {
        var p = this.props;

        var style = {
            left: p.object[p.xProp] - 4,
            top: p.object[p.yProp] - 4
        };

        return (
            <div className="drag-handle" style={style} onMouseDown={this.onMouseDown.bind(this)} />
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private onMouseDown(e: React.MouseEvent) {
        if (this.state.isDragging) {
            return;
        }

        var p = this.props;
        this.updateState(state => {
            state.isDragging = true;
            state.dragStartX = e.pageX;
            state.dragStartY = e.pageY;
            state.originX = p.object[p.xProp];
            state.originY = p.object[p.yProp];
            if (p.otherXProp) {
                state.otherOffsetX = p.object[p.otherXProp] - state.originX;
            }
            if (p.otherYProp) {
                state.otherOffsetY = p.object[p.otherYProp] - state.originY;
            }
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private onMouseUp(e: Event) {
        if (!this.state.isDragging) {
            return;
        }

        this.updateState(state => {
            state.isDragging = false;
            state.originX = state.originY = 0;
            state.otherOffsetX = state.otherOffsetY = 0;
            state.dragStartX = 0;
            state.dragStartY = 0;
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.state.isDragging) {
            return;
        }

        var s = this.state;
        var x = e.pageX - s.dragStartX + s.originX;
        var y = e.pageY - s.dragStartY + s.originY;

        var p = this.props;
        p.object[p.xProp] = x;
        p.object[p.yProp] = y;
        if (p.otherXProp) {
            p.object[p.otherXProp] = x + s.otherOffsetX;
        }
        if (p.otherYProp) {
            p.object[p.otherYProp] = y + s.otherOffsetY;
        }

        this.props.onUpdate();

        e.preventDefault();
        e.stopPropagation();
    }
}