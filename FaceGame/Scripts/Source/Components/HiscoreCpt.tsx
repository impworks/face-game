/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import { IGameState } from "../ViewModels/IGameState";

interface IHiscoreModalProps extends React.Props<HiscoreModalCpt> {
    gameState: IGameState;
    show: boolean;
    onSave: (name: string) => void;
    onHide: () => void;
}

export default class HiscoreModalCpt extends ComponentBase<IHiscoreModalProps, { }> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor(props: IHiscoreModalProps) {
        super(props);
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    render(): JSX.Element {
        var gs = this.props.gameState;
        var guessedFaces = gs.faces.filter(x => x.firstNameState != null).length;

        return (
            <ReactBootstrap.Modal show={this.props.show} onHide={this.props.onHide}>
                <form onSubmit={this.onFormSubmit.bind(this)} className="form-horizontal">
                    <ReactBootstrap.ModalHeader closeButton>
                        <ReactBootstrap.ModalTitle>Сохранение результата</ReactBootstrap.ModalTitle>
                    </ReactBootstrap.ModalHeader>
                    <ReactBootstrap.ModalBody>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Ваше имя</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" value={gs.name} disabled={true} />
                            </div>
                        </div>
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
                    </ReactBootstrap.ModalBody>
                    <ReactBootstrap.ModalFooter>
                        <ReactBootstrap.Button type="submit" className="btn btn-primary">
                            Завершить
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ModalFooter>
                </form>
            </ReactBootstrap.Modal>
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private onFormSubmit(e: React.SyntheticEvent) {
        this.props.onSave(name);
        e.preventDefault();
    }
}