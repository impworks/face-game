/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
/// <reference path="../../Typings/toastr.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import FaceCpt from "./FaceCpt";
import HiscoreCpt from "./HiscoreCpt";
import { IGameState } from "../ViewModels/IGameState";
import { IFaceState } from "../ViewModels/IFaceState";
import { IIdentificationResponse } from "../ViewModels/IIdentificationResponse";

interface IGameComponentState {
    gameState: IGameState;
    isDesignMode?: boolean;
    isLoaded?: boolean;
    isHiscoreModalShown?: boolean;
}

export default class GameCpt extends ComponentBase<any, IGameComponentState> {

    // -----------------------------------
    // Constants
    // -----------------------------------

    static API_ROOT = "/api/";

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();

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
    // Fields
    // -----------------------------------

    private _request: JQueryXHR;

    // -----------------------------------
    // Render
    // -----------------------------------

    render() {
        var game = this.state.gameState;
        var faces = game.faces.map(x => <FaceCpt key={x.id} face={x} onSave={this.checkFace.bind(this)} />);

        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="score-wrapper">
                        Счет: <strong>{game.score}</strong> очков
                    </div>
                    <div className="finish-wrapper">
                        {
                            this.state.isDesignMode &&
                            <ReactBootstrap.Button className="btn btn-success" onClick={this.addFace.bind(this) }>
                                <span className="glyphicon glyphicon-plus" />
                            </ReactBootstrap.Button>
                        }
                        <ReactBootstrap.Button className="btn btn-primary" onClick={this.showHiscoreModal.bind(this)} disabled={this.state.gameState.score === 0 || this.state.gameState.isFinished}>
                            Завершить
                        </ReactBootstrap.Button>
                    </div>
                </div>
                <div className="game-wrapper">
                    <img src="/Content/images/group.jpg" />
                    {faces}
                </div>
                <HiscoreCpt gameState={this.state.gameState} onSave={this.addHiscore.bind(this) } onHide={this.hideHiscoreModal.bind(this) } show={this.state.isHiscoreModalShown} />
            </div>
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private showHiscoreModal() {
        if (this.state.gameState.isFinished) {
            return false;
        }

        this.updateState(state => state.isHiscoreModalShown = true);
    }

    private hideHiscoreModal() {
        this.updateState(state => state.isHiscoreModalShown = false);
    }

    private addHiscore(name: string) {
        this.hideHiscoreModal();

        $.ajax({
                url: GameCpt.API_ROOT + 'complete',
                method: 'POST',
                data: {
                    name: name
                }
            })
            .then(
                (response: number) => {
                    toastr.success('Результат принят. Ваш ранг: #' + response);
                    this.updateState(state => {
                        for (var face of state.gameState.faces) {
                            face.firstNameState = face.firstNameState || false;
                            face.lastNameState = face.lastNameState || false;
                            face.middleNameState = face.middleNameState || false;
                        }
                        state.gameState.isFinished = true;
                    });
                },
                (xhr, status) => {
                    toastr.error('Ошибка соединения с сервером');
                    console.log('FAIL: ' + status);
                }
            );
    }

    private checkFace(face: IFaceState): JQueryPromise<IIdentificationResponse> {
        if (face.isDesignMode) {
            return this.defineFace(face);
        }

        return $.ajax({
                url: GameCpt.API_ROOT + 'identify',
                method: 'POST',
                data: face
            })
            .then(
                (response: IIdentificationResponse) => {
                    if (response.scoreAdded > 0) {
                        toastr.success('Вы заработали ' + response.scoreAdded + ' очков.');
                    } else {
                        toastr.info('Неверно.');
                    }

                    this.updateState(state => state.gameState.score += response.scoreAdded);

                    return response;
                },
                (xhr, status) => {
                    toastr.error('Ошибка соединения с сервером');
                    console.log('FAIL: ' + status);
                }
            );
    }

    private addFace() {
        if (!this.state.isDesignMode) {
            return;
        }

        var newId = _(this.state.gameState.faces || []).map(x => x.id).max() + 1 || 1;
        var face: IFaceState = {
            id: newId,
            x1: 10,
            y1: 10,
            x2: 60,
            y2: 60,
            hasMiddleName: true,
            isDesignMode: true
        };

        this.updateState(state => state.gameState.faces.push(face));
    }

    private defineFace(face: IFaceState): JQueryPromise<any> {
        return $.ajax({
                url: GameCpt.API_ROOT + 'define',
                method: 'POST',
                data: face
            })
            .then(
                () => {
                    toastr.success('Лицо добавлено.');
                },
                (xhr, status) => {
                    toastr.error('Ошибка соединения с сервером');
                    console.log('FAIL: ' + status);
                }
            );
    }

    // -----------------------------------
    // Overrides
    // -----------------------------------

    componentDidMount(): void {
        this._request = $.get(GameCpt.API_ROOT + 'state',
            result => {
                this.updateState(state => {
                    state.gameState = result;
                    state.isLoaded = true;
                });
            });
    }

    componentWillUnmount(): void {
        if (this._request) {
            this._request.abort();
        }
    }
}