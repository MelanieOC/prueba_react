class Pasajero {
    constructor(numero, nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.numero = numero;
    }
    toHTML() {
        return (<div className="well lista">
            <strong>Asiento N°{this.numero}</strong><br />
            <strong>Pasajero: </strong>{this.nombre} {this.apellido}<br />
            <strong>DNI: </strong>{this.dni}<br />
        </div>);
    }
}

let asientos = [];

asientos[0] = new Pasajero(1, 'Ricardo', 'Arjona', 123456789);
asientos[4] = new Pasajero(5, 'Macarena', 'Garcia', 123456789);
asientos[10] = new Pasajero(11, 'Diana', 'Perez', 123456789);
asientos[15] = new Pasajero(16, 'Dario', 'Lopez', 123456789);
asientos[22] = new Pasajero(23, 'Ruben', 'Juarez', 123456789);
asientos[30] = new Pasajero(31, 'Popeye', 'Sanchez', 123456789);
asientos[31] = new Pasajero(32, 'Muriel', 'D', 123456789);

class Model {
    constructor(asientos) {
        this.asientos = asientos;
        this.asientoSeleccionado = null;
    }
    addPlayer(text) {
        this.players.push({
            name: text.value,
            score: 0,
            id: this.players.length + 1
        })
        text.value = '';
        this.notify();
    }
    
    elegirAsiento(div){
        this.asientoSeleccionado=div;
        this.notify();
        console.log(div.textContent);
    }
    subscribe(render) {
        this.render = render;
    }
    notify() {
        this.render();
    }
}

const Boton = props => {
    let color='';
    return <button className={props.class} key={props.item} style={{ marginRight: props.margin, backgroundColor:color}} onClick={(e)=> props.model.elegirAsiento(e.currentTarget)}>{props.item}</button>;
}
const DibujarTabla = ({ model }) => {
    let tabla = [];
    for (let j = 0; j < model.asientos.length; j += 4) {
        let fila = [];
        for (let i = j + 1; i <= j + 4; i++) {
            let comparar = i === j + 2 ? '45px' : '';
            if (model.asientos[i - 1] !== undefined) {
                fila.push(<Boton class={'celda ocupado'} item={i} margin={comparar} model={model}/>);
            } else {
                fila.push(<Boton class={'celda desocupado'} item={i} margin={comparar} model={model}/>);
            }
        }
        tabla.push(<div className='fila'>{fila}</div>);
    }
    return <div>{tabla}</div>;
}

function listar(array) {
    return array.map(a => a.toHTML());
}
const Formulario = props => {
    return (
        <div id="reservar" className="tab-pane fade in active">
            <p>Seleccione un asiento <span id="numero"></span></p>
            <form>
                <div className="input-close">
                    <div className="row">
                        <div className="col-sm-2 col-xs-2 text-center">
                            <i className="fa fa-user-o fa-2x"></i>
                        </div>
                        <div className="col-sm-5 col-xs-5">
                            <input type="text" id="nombre" placeholder="Nombre" />
                        </div>
                        <div className="col-sm-5 col-xs-5">
                            <input type="text" id="apellido" placeholder="Apellido" />
                        </div>
                    </div>
                </div>
                <div className="input-close">
                    <div className="row">
                        <div className="col-sm-2 col-xs-2 text-center">
                            <i className="fa fa-address-card-o fa-2x"></i>
                        </div>
                        <div className="col-sm-8 col-xs-8">
                            <input type="number" id="dni" placeholder="DNI" />
                        </div>
                    </div>
                </div>
            </form>
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Faltan datos!</strong>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" id='btnReservar' disabled>Reservar</button>
            </div>
        </div>
    );
}
const App = ({ model }) => {
    return (
        <div>
            <header className="text-center">
                <h1>Reserva de Pasajes</h1>
            </header>
            <section className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div id="tabs">
                            <div id="leyenda">
                                <div className="col-md-4">Asiento seleccionado <span style={{ backgroundColor: '#6F9ADB' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                                <div className="col-md-4">Asiento ocupado <span className="ocupado">&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                                <div className="col-md-4">Asiento desocupado <span className="desocupado">&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                            </div>
                            <div className="panel with-nav-tabs panel-primary">
                                <div className="panel-heading">
                                    <ul className="nav nav-tabs nav-justified">
                                        <li className="active" id="tabReservar"><a data-toggle="tab" href="#reservar">Reservar</a></li>
                                        <li id="tabLiberar"><a data-toggle="tab" href="#liberar">Liberar Asiento</a></li>
                                        <li id="tabBuscar"><a data-toggle="tab" href="#buscar">Buscar</a></li>
                                        <li id="tabListar"><a data-toggle="tab" href="#listar">Listar pasajeros</a></li>
                                    </ul>
                                </div>
                                <div className="panel-body">
                                    <div className="tab-content">
                                        <Formulario/>
                                        <div id="liberar" className="tab-pane fade">
                                            <p>Escoja el asiento reservado a liberar</p>
                                        </div>
                                        <div id="buscar" className="tab-pane fade">
                                            <p>Ingrese el numero de DNI para empezar la busqueda</p>
                                            <div className="input-group">
                                                <input type="number" className="search-query form-control" placeholder="Buscar DNI" id="busqueda" />
                                                <span className="input-group-btn">
                                                    <button className="btn" id="btnBuscar" >
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </button>
                                                </span>
                                            </div>
                                            <div id="encontrados"></div>
                                        </div>
                                        <div id="listar" className="tab-pane fade">
                                            {listar(model.asientos)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" align='center'>
                        <div id='asientos'><DibujarTabla model={model} /></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

let model = new Model(asientos);
let render = () => {
    ReactDOM.render(
        <App model={model} />,
        document.getElementById('root')
    );
};

model.subscribe(render);
render();

