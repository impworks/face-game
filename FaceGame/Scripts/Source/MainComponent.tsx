/// <reference path="../Typings/react-global.d.ts"/>
/// <reference path="IGameState.ts"/>

export default class MainComponent extends React.Component<any, IGameState> {

    constructor() {
        super();
    }

    get score(): number {
        return 10;
    }

    private finishGame() {
        console.log('finished!');
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="score-wrapper">
                        Ваш счет: <strong>{this.score}</strong>
                    </div>
                    <div className="finish-wrapper">
                        <button className="btn btn-primary" onClick={this.finishGame}>
                            Завершить
                        </button>
                    </div>
                </div>
                <img src="./Assets/images/group.jpg" />
            </div>
        );
    }
}