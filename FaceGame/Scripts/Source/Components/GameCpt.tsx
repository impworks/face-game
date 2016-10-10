/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import FaceCpt from "./FaceCpt";
import { IGameState } from "../ViewModels/IGameState";
import { IFaceState } from "../ViewModels/IFaceState";

interface IGameComponentState {
    gameState: IGameState;
    isLoaded: boolean;
}

export default class GameCpt extends React.Component<any, IGameComponentState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();
    }

    // -----------------------------------
    // Constants
    // -----------------------------------

    static API_ROOT = "/api/";

    // -----------------------------------
    // Render
    // -----------------------------------

    render() {
        var game = this.state.gameState;
        var childFaces = game.faces.map(x => <FaceCpt key={x.id} face={x} onSave={this.checkFace.bind(this)} />);

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
                    {childFaces}
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

    private checkFace(face: IFaceState): JQueryPromise<any> {
        var promise = $.ajax({
            url: GameCpt.API_ROOT + 'identify',
            data: face,
            method: 'POST'
        }).then(
            (data: IIdentificationResponse) => {
                console.log('OK');

                face.firstNameState = data.isFirstNameCorrect;
                face.lastNameState = data.isLastNameCorrect;

                if(face.hasMiddleName)
                    face.middleNameState = data.isMiddleNameCorrect;

                this.state.gameState.score += data.scoreAdded;
            },
            (xhr, status) => {
                console.log('FAIL: ' + status);
            }
        );

        return promise;
    }

    // -----------------------------------
    // Overrides
    // -----------------------------------

    componentWillMount(): void {
        this.setState({
            gameState: this.getDefaultState(),
            isLoaded: true
        });
    }

    // -----------------------------------
    // Helpers
    // -----------------------------------

    private getDefaultState(): IGameState {
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
    }
}