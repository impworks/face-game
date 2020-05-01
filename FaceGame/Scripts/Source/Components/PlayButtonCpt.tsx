/// <reference path="../../Typings/react.d.ts" />
/// <reference path="../../Typings/react-bootstrap.d.ts" />
/// <reference path="../../Typings/lodash.d.ts" />
/// <reference path="../../Typings/jquery.d.ts" />

import ComponentBase from "../Tools/ComponentBase";
import GameCpt from "./GameCpt";

interface IPlayButtonState {
    name?: string;
    isModalShown: boolean;
}

export default class PlayButtonCpt extends ComponentBase<any, IPlayButtonState> {

    // -----------------------------------
    // Constructor
    // -----------------------------------

    constructor() {
        super();

        this.state = {
            name: '',
            isModalShown: false
        };
    }

    // -----------------------------------
    // Methods
    // -----------------------------------

    render(): JSX.Element {
        return (
            <div>
                <ReactBootstrap.Button className="btn btn-primary btn-lg" onClick={this.show.bind(this)}>
                    Давай сыграем
                </ReactBootstrap.Button>
                <ReactBootstrap.Modal show={this.state.isModalShown} onHide={this.hide.bind(this)}>
                    <form onSubmit={this.onFormSubmit.bind(this)} className="form-horizontal">
                        <ReactBootstrap.ModalHeader closeButton>
                            <ReactBootstrap.ModalTitle>Новая игра</ReactBootstrap.ModalTitle>
                        </ReactBootstrap.ModalHeader>
                        <ReactBootstrap.ModalBody>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Твое имя</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value={this.state.name} onChange={this.onInputChange.bind(this)} />
                                </div>
                            </div>
                        </ReactBootstrap.ModalBody>
                        <ReactBootstrap.ModalFooter>
                            <ReactBootstrap.Button type="submit" className="btn btn-primary">
                                Поехали!
                            </ReactBootstrap.Button>
                        </ReactBootstrap.ModalFooter>
                    </form>
                </ReactBootstrap.Modal>
            </div>
        );
    }

    // -----------------------------------
    // Handlers
    // -----------------------------------

    private show() {
        this.updateState(x => x.isModalShown = true);
    }

    private hide() {
        this.updateState(x => x.isModalShown = false);
    }

    private onInputChange(e: React.SyntheticEvent) {
        var value = (e.target as HTMLInputElement).value;

        this.updateState(x => x.name = value);
    }

    private onFormSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        $.ajax({
                url: GameCpt.API_ROOT + 'play',
                method: 'POST',
                data: {
                    name: this.state.name
                }
            })
            .then(
                (response: number) => {
                    location.href = '/Home/Game';
                },
                (xhr, status) => {
                    toastr.error('Ошибка соединения с сервером');
                    console.log('FAIL: ' + status);
                }
            );
    }
}