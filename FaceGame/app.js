var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("ViewModels/IFaceState", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ViewModels/IGameState", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ViewModels/IIdentificationResponse", ["require", "exports"], function (require, exports) {
    "use strict";
});
/// <reference path="../../Typings/react-global.d.ts" />
define("Tools/ComponentBase", ["require", "exports"], function (require, exports) {
    "use strict";
    var ComponentBase = (function (_super) {
        __extends(ComponentBase, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function ComponentBase(props) {
            _super.call(this, props);
        }
        // -----------------------------------
        // Methods
        // -----------------------------------
        ComponentBase.prototype.updateState = function (handler) {
            var newState = _.extend({}, this.state);
            handler(newState);
            this.setState(newState);
        };
        return ComponentBase;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ComponentBase;
});
/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
define("Components/DragHandle", ["require", "exports", "Tools/ComponentBase"], function (require, exports, ComponentBase_1) {
    "use strict";
    var DragHandle = (function (_super) {
        __extends(DragHandle, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function DragHandle(props) {
            var _this = this;
            _super.call(this, props);
            this.state = {
                isDragging: false
            };
            document.addEventListener('mousemove', function (e) { return _this.onMouseMove(e); });
            document.addEventListener('mouseup', function (e) { return _this.onMouseUp(e); });
        }
        // -----------------------------------
        // Methods
        // -----------------------------------
        DragHandle.prototype.render = function () {
            var p = this.props;
            var style = {
                left: p.object[p.xProp] - 4,
                top: p.object[p.yProp] - 4
            };
            return (React.createElement("div", {className: "drag-handle", style: style, onMouseDown: this.onMouseDown.bind(this)}));
        };
        // -----------------------------------
        // Handlers
        // -----------------------------------
        DragHandle.prototype.onMouseDown = function (e) {
            if (this.state.isDragging) {
                return;
            }
            var p = this.props;
            this.updateState(function (state) {
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
        };
        DragHandle.prototype.onMouseUp = function (e) {
            if (!this.state.isDragging) {
                return;
            }
            this.updateState(function (state) {
                state.isDragging = false;
                state.originX = state.originY = 0;
                state.otherOffsetX = state.otherOffsetY = 0;
                state.dragStartX = 0;
                state.dragStartY = 0;
            });
            e.preventDefault();
            e.stopPropagation();
        };
        DragHandle.prototype.onMouseMove = function (e) {
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
        };
        return DragHandle;
    }(ComponentBase_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DragHandle;
});
/// <reference path="../../Typings/react.d.ts" />
define("Components/TextInputCpt", ["require", "exports"], function (require, exports) {
    "use strict";
    var TextInputCpt = (function (_super) {
        __extends(TextInputCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function TextInputCpt(props) {
            _super.call(this, props);
            this.state = {
                value: props.value
            };
        }
        // -----------------------------------
        // Render
        // -----------------------------------
        TextInputCpt.prototype.render = function () {
            var groupClasses = "form-group";
            var icon = null;
            var hasState = this.props.state != null;
            if (hasState) {
                groupClasses += " has-feedback has-" + (this.props.state ? "success" : "error");
                var iconClasses = "glyphicon glyphicon-" + (this.props.state ? "ok" : "remove") + " form-control-feedback";
                icon = React.createElement("span", {className: iconClasses});
            }
            return React.createElement("div", {className: groupClasses}, React.createElement("label", {className: "control-label col-sm-4"}, this.props.title), React.createElement("div", {className: "col-sm-8"}, React.createElement("input", {type: "text", className: "form-control", disabled: hasState, readOnly: hasState, value: this.state.value, onChange: this.onInputChange.bind(this)}), icon));
        };
        // -----------------------------------
        // Methods
        // -----------------------------------
        TextInputCpt.prototype.getValue = function () {
            return this.state.value;
        };
        // -----------------------------------
        // Private handlers
        // -----------------------------------
        TextInputCpt.prototype.onInputChange = function (e) {
            var value = e.target.value;
            this.setState({ value: value });
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
        return TextInputCpt;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TextInputCpt;
});
/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
define("Components/FaceCpt", ["require", "exports", "Tools/ComponentBase", "Components/TextInputCpt", "Components/DragHandle"], function (require, exports, ComponentBase_2, TextInputCpt_1, DragHandle_1) {
    "use strict";
    var FaceCpt = (function (_super) {
        __extends(FaceCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function FaceCpt(props) {
            _super.call(this, props);
            this.state = {
                face: props.face,
                isProcessing: true,
                isHovered: false
            };
        }
        // -----------------------------------
        // Rendering
        // -----------------------------------
        FaceCpt.prototype.render = function () {
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
            return (React.createElement("div", null, React.createElement(ReactBootstrap.OverlayTrigger, {rootClose: true, placement: "bottom", trigger: "click", overlay: popover}, React.createElement("div", {className: blockClasses, style: blockStyles, onMouseOver: this.onMouseOver.bind(this), onMouseOut: this.onMouseOut.bind(this)})), canDesign &&
                React.createElement(DragHandle_1.default, {object: this.state.face, onUpdate: this.onMove.bind(this), xProp: "x1", yProp: "y1", otherXProp: "x2", otherYProp: "y2"}), canDesign &&
                React.createElement(DragHandle_1.default, {object: this.state.face, onUpdate: this.onMove.bind(this), xProp: "x2", yProp: "y2"})));
        };
        FaceCpt.prototype.renderPopover = function () {
            /// <summary>Renders the clickable popover.</summary>
            var face = this.state.face;
            var canSave = face.firstNameState == null && face.lastName == null;
            return React.createElement(ReactBootstrap.Popover, {id: "face-popover"}, React.createElement("form", {className: "form-horizontal ", onSubmit: this.onSave.bind(this)}, React.createElement(TextInputCpt_1.default, {title: "Фамилия", value: face.lastName, state: face.lastNameState, disabled: this.state.isProcessing, onChange: function (v) { return face.lastName = v; }}), React.createElement(TextInputCpt_1.default, {title: "Имя", value: face.firstName, state: face.firstNameState, disabled: this.state.isProcessing, onChange: function (v) { return face.firstName = v; }}), face.hasMiddleName &&
                React.createElement(TextInputCpt_1.default, {title: "Отчество", value: face.middleName, state: face.middleNameState, disabled: this.state.isProcessing, onChange: function (v) { return face.middleName = v; }}), canSave &&
                React.createElement("div", {className: "form-group"}, React.createElement("div", {className: "col-sm-12"}, React.createElement("div", {className: "pull-right"}, React.createElement(ReactBootstrap.Button, {type: "submit", className: "btn btn-primary"}, "Сохранить")), React.createElement("div", {className: "clearfix"})))));
        };
        FaceCpt.prototype.getOverlayClasses = function () {
            var detected = this.props.face.firstNameState;
            var isHovered = this.state.isHovered;
            var classes = [
                'face',
                detected == null ? 'face-new' : 'face-identified',
                isHovered ? 'hovered' : ''
            ];
            return classes.join(' ');
        };
        // -----------------------------------
        // Private handlers
        // -----------------------------------
        FaceCpt.prototype.onMouseOver = function () {
            this.updateState(function (x) { return x.isHovered = true; });
        };
        FaceCpt.prototype.onMouseOut = function () {
            this.updateState(function (x) { return x.isHovered = false; });
        };
        FaceCpt.prototype.onMove = function () {
            this.updateState(function () { });
        };
        FaceCpt.prototype.onSave = function (e) {
            var _this = this;
            e.preventDefault();
            this.updateState(function (x) { return x.isProcessing = true; });
            if (this.props.onSave) {
                this.props.onSave(this.state.face)
                    .then(function (response) {
                    _this.updateState(function (state) {
                        state.isProcessing = false;
                        state.face.firstNameState = !response || response.isFirstNameCorrect;
                        state.face.lastNameState = !response || response.isLastNameCorrect;
                        state.face.middleNameState = !response || response.isMiddleNameCorrect;
                    });
                });
            }
        };
        return FaceCpt;
    }(ComponentBase_2.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FaceCpt;
});
/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
define("Components/HiscoreCpt", ["require", "exports", "Tools/ComponentBase"], function (require, exports, ComponentBase_3) {
    "use strict";
    var HiscoreModalCpt = (function (_super) {
        __extends(HiscoreModalCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function HiscoreModalCpt(props) {
            _super.call(this, props);
            this.state = { name: '' };
        }
        // -----------------------------------
        // Methods
        // -----------------------------------
        HiscoreModalCpt.prototype.render = function () {
            var gs = this.props.gameState;
            var guessedFaces = gs.faces.filter(function (x) { return x.firstNameState != null; }).length;
            var isOk = !!this.state.name;
            return (React.createElement(ReactBootstrap.Modal, {show: this.props.show, onHide: this.props.onHide}, React.createElement("form", {onSubmit: this.onFormSubmit.bind(this), className: "form-horizontal"}, React.createElement(ReactBootstrap.ModalHeader, {closeButton: true}, React.createElement(ReactBootstrap.ModalTitle, null, "Сохранение результата")), React.createElement(ReactBootstrap.ModalBody, null, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "col-sm-4 control-label"}, "Отвечено"), React.createElement("div", {className: "col-sm-8"}, React.createElement("div", {className: "form-control-static"}, guessedFaces, " из ", gs.faces.length))), React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "col-sm-4 control-label"}, "Результат"), React.createElement("div", {className: "col-sm-8"}, React.createElement("div", {className: "form-control-static"}, gs.score, " очков"))), React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "col-sm-4 control-label"}, "Ваше имя"), React.createElement("div", {className: "col-sm-8"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.name, onChange: this.onInputChange.bind(this)})))), React.createElement(ReactBootstrap.ModalFooter, null, React.createElement(ReactBootstrap.Button, {type: "submit", className: "btn btn-primary", disabled: !isOk}, "Сохранить")))));
        };
        // -----------------------------------
        // Handlers
        // -----------------------------------
        HiscoreModalCpt.prototype.onInputChange = function (e) {
            var value = e.target.value;
            this.updateState(function (x) { return x.name = value; });
        };
        HiscoreModalCpt.prototype.onFormSubmit = function (e) {
            var name = this.state.name;
            if (name) {
                this.props.onSave(name);
            }
            e.preventDefault();
        };
        return HiscoreModalCpt;
    }(ComponentBase_3.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HiscoreModalCpt;
});
/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
/// <reference path="../../Typings/toastr.d.ts" />
define("Components/GameCpt", ["require", "exports", "Tools/ComponentBase", "Components/FaceCpt", "Components/HiscoreCpt"], function (require, exports, ComponentBase_4, FaceCpt_1, HiscoreCpt_1) {
    "use strict";
    var GameCpt = (function (_super) {
        __extends(GameCpt, _super);
        // -----------------------------------
        // Constructor
        // -----------------------------------
        function GameCpt() {
            _super.call(this);
            this.state = {
                gameState: {
                    isFinished: false,
                    faces: [],
                    score: 0
                },
                isDesignMode: window.location.search === '?design'
            };
        }
        // -----------------------------------
        // Render
        // -----------------------------------
        GameCpt.prototype.render = function () {
            var _this = this;
            var game = this.state.gameState;
            var faces = game.faces.map(function (x) { return React.createElement(FaceCpt_1.default, {key: x.id, face: x, onSave: _this.checkFace.bind(_this)}); });
            return (React.createElement("div", {className: "content-wrapper"}, React.createElement("div", {className: "content-header"}, React.createElement("div", {className: "score-wrapper"}, "Ваш счет: ", React.createElement("strong", null, game.score)), React.createElement("div", {className: "finish-wrapper"}, this.state.isDesignMode &&
                React.createElement(ReactBootstrap.Button, {className: "btn btn-success", onClick: this.addFace.bind(this)}, React.createElement("span", {className: "glyphicon glyphicon-plus"})), React.createElement(ReactBootstrap.Button, {className: "btn btn-primary", onClick: this.showHiscoreModal.bind(this), disabled: this.state.gameState.score === 0 || this.state.gameState.isFinished}, "Завершить"))), React.createElement("div", {className: "game-wrapper"}, React.createElement("img", {src: "./Content/images/group.jpg"}), faces), React.createElement(HiscoreCpt_1.default, {gameState: this.state.gameState, onSave: this.addHiscore.bind(this), onHide: this.hideHiscoreModal.bind(this), show: this.state.isHiscoreModalShown})));
        };
        // -----------------------------------
        // Handlers
        // -----------------------------------
        GameCpt.prototype.showHiscoreModal = function () {
            if (this.state.gameState.isFinished) {
                return false;
            }
            this.updateState(function (state) { return state.isHiscoreModalShown = true; });
        };
        GameCpt.prototype.hideHiscoreModal = function () {
            this.updateState(function (state) { return state.isHiscoreModalShown = false; });
        };
        GameCpt.prototype.addHiscore = function (name) {
            var _this = this;
            this.hideHiscoreModal();
            $.ajax({
                url: GameCpt.API_ROOT + 'complete',
                method: 'POST',
                data: {
                    name: name
                }
            })
                .then(function (response) {
                toastr.success('Результат принят. Ваш ранг: #' + response);
                _this.updateState(function (state) {
                    for (var _i = 0, _a = state.gameState.faces; _i < _a.length; _i++) {
                        var face = _a[_i];
                        face.firstNameState = face.firstNameState || false;
                        face.lastNameState = face.lastNameState || false;
                        face.middleNameState = face.middleNameState || false;
                    }
                    state.gameState.isFinished = true;
                });
            }, function (xhr, status) {
                toastr.error('Ошибка соединения с сервером');
                console.log('FAIL: ' + status);
            });
        };
        GameCpt.prototype.checkFace = function (face) {
            var _this = this;
            if (face.isDesignMode) {
                return this.defineFace(face);
            }
            return $.ajax({
                url: GameCpt.API_ROOT + 'identify',
                method: 'POST',
                data: face
            })
                .then(function (response) {
                if (response.scoreAdded > 0) {
                    toastr.success('Вы заработали ' + response.scoreAdded + ' очков.');
                }
                else {
                    toastr.info('Неверно.');
                }
                _this.updateState(function (state) { return state.gameState.score += response.scoreAdded; });
                return response;
            }, function (xhr, status) {
                toastr.error('Ошибка соединения с сервером');
                console.log('FAIL: ' + status);
            });
        };
        GameCpt.prototype.addFace = function () {
            if (!this.state.isDesignMode) {
                return;
            }
            var newId = _(this.state.gameState.faces || []).map(function (x) { return x.id; }).max() + 1 || 1;
            var face = {
                id: newId,
                x1: 10,
                y1: 10,
                x2: 60,
                y2: 60,
                hasMiddleName: true,
                isDesignMode: true
            };
            this.updateState(function (state) { return state.gameState.faces.push(face); });
        };
        GameCpt.prototype.defineFace = function (face) {
            return $.ajax({
                url: GameCpt.API_ROOT + 'define',
                method: 'POST',
                data: face
            })
                .then(function () {
                toastr.success('Лицо добавлено.');
            }, function (xhr, status) {
                toastr.error('Ошибка соединения с сервером');
                console.log('FAIL: ' + status);
            });
        };
        // -----------------------------------
        // Overrides
        // -----------------------------------
        GameCpt.prototype.componentDidMount = function () {
            var _this = this;
            this._request = $.get(GameCpt.API_ROOT + 'state', function (result) {
                _this.updateState(function (state) {
                    state.gameState = result;
                    state.isLoaded = true;
                });
            });
        };
        GameCpt.prototype.componentWillUnmount = function () {
            if (this._request) {
                this._request.abort();
            }
        };
        // -----------------------------------
        // Constants
        // -----------------------------------
        GameCpt.API_ROOT = "/api/";
        return GameCpt;
    }(ComponentBase_4.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameCpt;
});
//# sourceMappingURL=app.js.map