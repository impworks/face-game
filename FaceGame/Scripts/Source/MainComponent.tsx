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
                    <div className="score">
                        Ваш счет: {this.score}
                    </div>
                    <button className="btn btn-primary" onClick={this.finishGame()}>
                        Завершить
                    </button>
                </div>
                <img src="./Assets/images/group.jpg" />
            </div>
        );
    }
}