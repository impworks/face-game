/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />
/// <reference path="../../Typings/toastr.d.ts" />

import FaceCpt from "./FaceCpt";
import { IGameState } from "../ViewModels/IGameState";
import { IFaceState } from "../ViewModels/IFaceState";
import { IIdentificationResponse } from "../ViewModels/IIdentificationResponse";

interface IGameComponentState {
    gameState: IGameState;
    isLoaded: boolean;
}

export default class GameCpt extends React.Component<any, IGameComponentState> {

    // -----------------------------------
    // Constants
    // -----------------------------------

    static API_ROOT = "/api/";

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();
    }

    // -----------------------------------
    // Fields
    // -----------------------------------

    private _request: JQueryXHR;

    // -----------------------------------
    // Render
    // -----------------------------------

    render() {

        if (this.state == null)
            return null;

        var game = this.state.gameState;
        var faces = game.faces.map(x => <FaceCpt key={x.id} face={x} onSave={this.checkFace.bind(this)} />);

        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="score-wrapper">
                        Ваш счет: <strong>{game.score}</strong>
                    </div>
                    <div className="finish-wrapper">
                        <ReactBootstrap.Button className="btn btn-primary" onClick={this.finishGame}>
                            Завершить
                        </ReactBootstrap.Button>
                    </div>
                </div>
                <div className="game-wrapper">
                    <img src="./Assets/images/group.jpg" />
                    {faces}
                </div>
            </div>
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private finishGame() {
        console.log('finished?');
    }

    private checkFace(face: IFaceState): JQueryPromise<IIdentificationResponse> {
        var promise = $.ajax({
            url: GameCpt.API_ROOT + 'identify',
            data: face,
            method: 'POST'
        }).then(
            (response: IIdentificationResponse) => {
                if (response.scoreAdded > 0) {
                    toastr.success('Вы заработали ' + response.scoreAdded + ' очков.');
                } else {
                    toastr.info('Неверно.');
                }

                var newState = _.merge({}, this.state, {
                        gameState: {
                            score: this.state.gameState.score + response.scoreAdded
                        }
                    }
                );

                this.setState(newState);

                return response;
            },
            (xhr, status) => {
                toastr.error('Ошибка соединения с сервером');
                console.log('FAIL: ' + status);
            }
        );

        return promise;
    }

    // -----------------------------------
    // Overrides
    // -----------------------------------

    componentDidMount(): void {
        this._request = $.get(GameCpt.API_ROOT + 'state',
            result => {
                this.setState({
                    gameState: result,
                    isLoaded: true
                });
            });
    }

    componentWillUnmount(): void {
        if (this._request) {
            this._request.abort();
        }
    }

    private getDefaultState(): IGameState {
        return {
            isFinished: false,
            faces: [],
            score: 0
        };
    }
}