/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import { IGameState } from "../ViewModels/IGameState";

interface IHiscoreModalProperties {
    gameState: IGameState;
    show: boolean;
    onSave: (name: string) => void;
    onHide: () => void;
}

interface IHiscoreModalState {
    show: boolean;
    name: string;
}

export default class HiscoreModalCpt extends ComponentBase<IHiscoreModalProperties, IHiscoreModalState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    render(): JSX.Element {
        if (this.state == null)
            return null;

        var gs = this.props.gameState;
        var guessedFaces = gs.faces.filter(x => x.firstNameState != null).length;

        var isOk = !!this.state.name;

        return (
            <ReactBootstrap.Modal show={this.state.show} onHide={this.props.onHide}>
                <form onSubmit={this.onFormSubmit.bind(this)} className="form-horizontal">
                    <ReactBootstrap.ModalHeader closeButton>
                        <ReactBootstrap.ModalTitle>Сохранение результата</ReactBootstrap.ModalTitle>
                    </ReactBootstrap.ModalHeader>
                    <ReactBootstrap.ModalBody>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Отвечено</label>
                            <div className="col-sm-8">
                                <div className="form-control-static">
                                    {guessedFaces} из {gs.faces.length}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Результат</label>
                            <div className="col-sm-8">
                                <div className="form-control-static">
                                    {gs.score} очков
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Ваше имя</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" value={this.state.name} onChange={this.onInputChange.bind(this)} />
                            </div>
                        </div>
                    </ReactBootstrap.ModalBody>
                    <ReactBootstrap.ModalFooter>
                        <ReactBootstrap.Button type="submit" className="btn btn-primary" disabled={!isOk}>
                            Сохранить
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ModalFooter>
                </form>
            </ReactBootstrap.Modal>
        );
    }

    private getDefaultState(): IHiscoreModalState {
        return {
            name: '',
            show: false
        };
    }

    componentWillReceiveProps(nextProps: IHiscoreModalProperties, nextContext): void {
        this.updateState(state => state.show = nextProps.show);
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private onInputChange(e: React.SyntheticEvent) {
        var value = (e.target as HTMLInputElement).value;

        this.updateState(x => x.name = value);
    }

    private onFormSubmit(e: React.SyntheticEvent) {
        var name = this.state.name;
        if (name) {
            this.props.onSave(name);
        }

        e.preventDefault();
    }
}