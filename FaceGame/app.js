var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="IFaceState.ts" />
/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
define("Components/FaceCpt", ["require", "exports"], function (require, exports) {
    "use strict";
    var FaceCpt = (function (_super) {
        __extends(FaceCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function FaceCpt(props) {
            _super.call(this, props);
            this.state = props.face;
        }
        // -----------------------------------
        // Rendering
        // -----------------------------------
        FaceCpt.prototype.render = function () {
            var styles = {
                left: this.state.x,
                top: this.state.y,
                width: this.state.width,
                height: this.state.height
            };
            var classes = "face " + (this.state.isHovered ? 'hovered' : '');
            return (React.createElement("div", {className: classes, style: styles, onMouseOver: this.onMouseOver.bind(this), onMouseOut: this.onMouseOut.bind(this)}));
        };
        // -----------------------------------
        // Private handlers
        // -----------------------------------
        FaceCpt.prototype.onMouseOver = function () {
            this.setPty('isHovered', true);
        };
        FaceCpt.prototype.onMouseOut = function () {
            this.setPty('isHovered', false);
        };
        FaceCpt.prototype.setPty = function (name, value) {
            var newState = _.extend(this.state, (_a = {}, _a[name] = value, _a));
            this.setState(newState);
            var _a;
        };
        return FaceCpt;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FaceCpt;
});
/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../ViewModels/IState.ts"/>
define("Components/GameCpt", ["require", "exports", "Components/FaceCpt"], function (require, exports, FaceCpt_1) {
    "use strict";
    var GameCpt = (function (_super) {
        __extends(GameCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function GameCpt() {
            _super.call(this);
        }
        // -----------------------------------
        // Render
        // -----------------------------------
        GameCpt.prototype.render = function () {
            var childFaces = this.state.faces.map(function (x) { return React.createElement(FaceCpt_1.default, {face: x}); });
            return (React.createElement("div", {className: "content-wrapper"}, React.createElement("div", {className: "content-header"}, React.createElement("div", {className: "score-wrapper"}, "Ваш счет: ", React.createElement("strong", null, this.state.score)), React.createElement("div", {className: "finish-wrapper"}, React.createElement("button", {className: "btn btn-primary", onClick: this.finishGame}, "Завершить"))), React.createElement("img", {src: "./Assets/images/group.jpg"}), childFaces));
        };
        // -----------------------------------
        // Handlers
        // -----------------------------------
        GameCpt.prototype.finishGame = function () {
            // TODO
            console.log('finished?');
        };
        // -----------------------------------
        // Overrides
        // -----------------------------------
        GameCpt.prototype.componentWillMount = function () {
            this.setState(this.getDefaultState());
        };
        // -----------------------------------
        // Helpers
        // -----------------------------------
        GameCpt.prototype.getDefaultState = function () {
            return {
                score: 0,
                faces: [
                    {
                        id: 1,
                        x: 10,
                        y: 10,
                        width: 150,
                        height: 150
                    },
                    {
                        id: 2,
                        x: 300,
                        y: 20,
                        width: 150,
                        height: 150
                    }
                ]
            };
        };
        return GameCpt;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameCpt;
});
//# sourceMappingURL=app.js.map