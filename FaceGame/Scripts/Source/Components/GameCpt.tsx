/// <reference path="../../Typings/react-global.d.ts" />
/// <reference path="../ViewModels/IState.ts"/>

import FaceCpt from "./FaceCpt";

export default class GameCpt extends React.Component<any, IState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();
    }

    // -----------------------------------
    // Render
    // -----------------------------------

    render() {
        var childFaces = this.state.faces.map(x => <FaceCpt key={x.id} face={x}/>);

        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="score-wrapper">
                        Ваш счет: <strong>{this.state.score}</strong>
                    </div>
                    <div className="finish-wrapper">
                        <button className="btn btn-primary" onClick={this.finishGame}>
                            Завершить
                        </button>
                    </div>
                </div>
                <img src="./Assets/images/group.jpg" />
                {childFaces}
            </div>
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private finishGame() {
        // TODO
        console.log('finished?');
    }

    // -----------------------------------
    // Overrides
    // -----------------------------------

    componentWillMount(): void {
        this.setState(this.getDefaultState());
    }

    // -----------------------------------
    // Helpers
    // -----------------------------------

    private getDefaultState(): IState {
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
        }
    }
}