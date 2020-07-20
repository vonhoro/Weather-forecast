// Todo lo que mencione buscalo en MDN, para mi es la mejor documentacion para JS. Tambien puedes probar con javascript.info

import React from 'react'
import Items from './allItems'

//Meals

// Usa const en variables que no vas a reasignar
//let Item =Items('All');
const Item = Items('All')

// Hay una forma mejor de hacer esto
/*
let Nums=[];
for (let i=0;i<26;i++){
   Nums.push(0);
}
*/

// Array(x) crea un array de tamano x pero esta vacio, asi que no se puede iterar, por lo tanto se usa Array.from.
// Luego usamos map para cambiar el valor de cada elemento a 0
const Num = Array.from(Array(25)).map(() => 0)

//The menu

class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Order: 'Order-Squares',
            Form: 'Invisible',
            Receipt: 'Invisible',
            Paying: 'Invisible',
            ShowBotton: true,
            Items: Item, // No tiene sentido seleccionar cada valor cuando al final vas a quedar con la misma lista
            Nums: Nums,
            FirstName: '',
            LastName: '',
            Address: '',
            Phone: '',
            Email: '',
            PaymentMethod: '',
            displayDate: '',
            OrderNumber: 0,
            OrderNumberShown: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        /*
       let d = new Date();
       let Month = (d.getMonth()+1 < 10)? '0'+(d.getMonth()+1): (d.getMonth()+1);
       let Day = (d.getDate() < 10)? '0'+d.getDate(): d.getDate();
       let Hours = (d.getHours() < 10)? '0'+d.getHours(): d.getHours();
       let Minutes = (d.getMinutes() < 10)? '0'+d.getMinutes(): d.getMinutes();
       let displayDate = d.getFullYear() + '-'+Month+'-'+Day+' '+Hours+':'+Minutes;
       */

        // Evita crear variables de una sola letra, porque es poco legible
        const date = new Date()

        // No comienzes una variable con mayuscula al menos que sea una Clase o una CONSTANTE.
        // En JavaScript se usa PascalCase para las clases y camelCase para lo demas.
        // Para esto es mejor usar .padStart o .padEnd
        // En este caso le estamos diciendo que si la palabra tiene menos de 2 caracteres, le agregue 0 al principio hasta que sean 2 caracteres
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        // Has lo mismo con los otros

        // Cuando combinas muchas variables y cadenas de texto, usa template strings
        // Como puedes ver es mucho mas facil de leer
        const displayDate = `${d.getFullYear()}-${month}-${day} ${hours}:${minutes}`

        let OrderNumber = this.state.OrderNumber + 1
        let OrderNumberShown = OrderNumber / 1000000
        OrderNumberShown = OrderNumberShown.toString()
        OrderNumberShown = OrderNumberShown.substr(2)

        this.setState({
            PaymentMethod: e.target[3].value,
            Form: 'Invisible',
            Order: 'Invisible',
            Receipt: 'Receipt',
            Paying: 'Invisible',
            ShowBotton: true,
            displayDate: displayDate,
            OrderNumber: OrderNumber,
            OrderNumberShown: OrderNumberShown,
        })
    }

    changeValues = (e) => {
        let Nam = e.target.name
        let Val = e.target.value
        this.setState({ [Nam]: Val })
    }

    changesValuesOrder = (z, e) => {
        let Nam = e.target.name
        let Val = e.target.value
        Item[z].Quantity = 1
        Item[z].Quantity = Val * Item[z].Quantity
        Nums[z] = parseFloat((Item[z].Quantity * Item[z].Price).toFixed(2))
        this.setState({ [Nam]: Item[z], Nums: Nums })
    }

    Reset = (e) => {
        // Los valores del DOM deberias manejarlos a traves del state, y no modificarlos directamente
        // Ademas es mejor simplemente usar forEach o for .. of
        /*
       for(let i =0; i < Nums.length; i++){
          Nums[i]=0;
          e.target.parentElement.parentElement.children[i].lastChild.lastChild.value = "0";
       }
       */

        Nums.forEach((num, index) => {
            Num[index] = 0
            e.target.parentElement.parentElement.children[
                i
            ].lastChild.lastChild.value = '0' // Te lo dejo pero deberias cambiarlo
        })

        // Aqui la verdad no entiendo el uso de Nums
        this.setState({ Nums: Nums })
    }

    sendForm = () => {
        let Nums = this.state.Nums

        // Cuando la condicion es simple puedes hacer en una sola linea
        /*
            let check = Nums.filter((value) => {
                return value > 0;
            });
        */
        const check = Nums.filter((value) => value > 0)

        let Form = check.length > 0 ? 'Form-Space' : 'Invisible'
        let Order = check.length > 0 ? 'Invisible' : 'Order-Squares'
        this.setState({
            Form: Form,
            Order: Order,
            Receipt: 'Invisible',
            Paying: 'Invisible',
        })
    }

    backForm = () => {
        let count = this.state.OrderNumber - 1

        this.setState({
            Form: 'Form-Space',
            Order: 'Invisible',
            Receipt: 'Invisible',
            Paying: 'Invisible',
            OrderNumber: count,
        })
    }

    backToOrder = () => {
        this.setState({
            Form: 'Invisible',
            Order: 'Order-Squares',
            Receipt: 'Invisible',
            Paying: 'Invisible',
        })
    }

    checkOut = () => {
        this.setState({
            Form: 'Invisible',
            Order: 'Invisible',
            Receipt: 'Invisible',
            Paying: 'Paying',
        })
    }

    showReceipt = () => {
        this.setState({
            Form: 'Invisible',
            Order: 'Invisible',
            Receipt: 'Receipt',
            Paying: 'Invisible',
            ShowBotton: true,
        })
    }

    Finish = () => {
        this.setState({
            Form: 'Invisible',
            Order: 'Invisible',
            Receipt: 'Receipt',
            Paying: 'Invisible',
            ShowBotton: false,
        })
    }

    newOrder = (e) => {
        //the form
        e.target.parentElement.parentElement.children[0].firstElementChild.reset()
        //the order
        for (let i = 0; i < Nums.length; i++) {
            Nums[i] = 0
            e.target.parentElement.parentElement.children[1].children[
                i
            ].lastElementChild.firstElementChild.value = '0'
        }
        this.setState({
            Nums: Nums,
            ShowBotton: true,
            Form: 'Invisible',
            Order: 'Order-Squares',
            Receipt: 'Invisible',
            Paying: 'Invisible',
        })
    }

    render() {
        // Aqui puedes usar Array.reduce
        /*
            let Total = 0;
        
            this.state.Nums.forEach((Price) => {
                Total += Price;
            })
        
            Total = parseFloat(Total.toFixed(2));
        */

        const total = this.state.Nums((acumulado, valorActual) => {
            return acumulado + valorActual
        }, 0)

        const totalRedondeado = parseFloat(total.toFixed(2))

        return (
            <div>
                <div className={this.state.Form}>
                    <form onSubmit={this.handleSubmit} id="add-todo">
                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="FirstName">First Name:</label>
                            </div>

                            <div className="col-input-f">
                                <input
                                    type="text"
                                    name="FirstName"
                                    required
                                    autoFocus
                                    maxLength="20"
                                    placeholder="Michael"
                                    onChange={this.changeValues}
                                />
                            </div>
                        </div>

                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="LastName">last Name:</label>
                            </div>
                            <div className="col-input-f">
                                <input
                                    type="text"
                                    name="LastName"
                                    required
                                    maxLength="20"
                                    placeholder="Jackson"
                                    onChange={this.changeValues}
                                />
                            </div>
                        </div>

                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="Address">Address:</label>
                            </div>
                            <div className="col-input-f">
                                <textarea
                                    onChange={this.changeValues}
                                    name="Address"
                                    required
                                    placeholder="Where will you recieve the order?"
                                />
                            </div>
                        </div>

                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="paymethod">
                                    Payment Method:
                                </label>
                            </div>
                            <div className="col-input-f">
                                <select type="text" name="Paymethod">
                                    <option value="Credit-Card">
                                        Credit Card
                                    </option>
                                    <option value="Bank-Transfer">
                                        Bank Transfer
                                    </option>
                                    <option value="Bitcoin">Bitcoin</option>
                                    <option value="Zelle">Zelle</option>
                                    <option value="Paypal">Paypal</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                        </div>

                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="Phone">Phone number:</label>
                            </div>
                            <div className="col-input-f">
                                <input
                                    type="tel"
                                    name="Phone"
                                    pattern="[0-9]{3}[-]{1}[0-9]{7}"
                                    required
                                    placeholder="123-1239875"
                                    onChange={this.changeValues}
                                />
                            </div>
                        </div>

                        <div className="line">
                            <div className="col-label-f">
                                <label htmlFor="Email">Email(Optional):</label>
                            </div>
                            <div className="col-input-f">
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="delicus@delicus.net"
                                    onChange={this.changeValues}
                                />
                            </div>
                        </div>

                        <div id="boton-container-f">
                            <input
                                type="submit"
                                className="boton"
                                value="Confirm"
                            />
                            <button
                                onClick={this.backToOrder}
                                type="button"
                                id="cancel"
                                className="boton"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>

                {/* Order       
                Aqui los elementos siguen la misma estructura, asi que podemos usar .map para manejarlos todos
                */}
                <div className={this.state.Order}>
                    {this.state.Items.map((item, index) => (
                        <div className="Order-Item" key={item.id}>
                            <div className="Order-Square">
                                <p>{item.Name}</p>
                                <p>{item.Price}$ each</p>
                            </div>

                            <div className="Order-Amount">
                                <input
                                    type="number"
                                    name={`Items[${index}]`}
                                    min="0"
                                    max="20"
                                    defaultValue="0"
                                    onChange={(e) =>
                                        this.changesValuesOrder(index, e)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/*    
                 Lo mismo
                */}

                <div className="Order-Item-Total">
                    {this.state.Items.map((Item, index) => (
                        <h1
                            className={
                                Nums[index] === 0 ? 'Invisible' : 'Listed'
                            }
                        >
                            {' '}
                            {Item.Name} x{Item.Quantity}
                        </h1>
                    ))}

                    <h1 className="Total"> Total: ${Total}</h1>
                    <button className="Order-Boton1" onClick={this.sendForm}>
                        Confirm
                    </button>
                    <button className="Order-Boton2" onClick={this.Reset}>
                        Reset
                    </button>
                </div>

                {/* Receipt */}

                <div className={this.state.Receipt}>
                    <div className="Receipt-Holder">
                        <div className="Holds-Meta">
                            <h1 className="Receipt-Meta-Item">
                                {this.state.displayDate}
                            </h1>
                            <h1 className="Receipt-Meta-Item">
                                #{this.state.OrderNumberShown}
                            </h1>
                        </div>
                        <h1 className="Receipt-Item">
                            Ful Name: {this.state.FirstName}{' '}
                            {this.state.LastName}
                        </h1>

                        <h1 className="Receipt-Item">
                            Phone Number: {this.state.Phone}
                        </h1>

                        <h1 className="Receipt-Item">
                            Email: {this.state.Email}
                        </h1>

                        <h1 className="Receipt-Item">
                            Address: {this.state.Address}
                        </h1>

                        <h1 className="Receipt-Item">Order:</h1>

                        <div className="Orders-Listing">
                            {/* Aqui igual, pero te dejo para que lo hagas por tu cuenta */}

                            <h1
                                className={
                                    Nums[0] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[0].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[0] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[0].Price} x
                                {this.state.Items[0].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[1] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[1].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[1] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[1].Price} x
                                {this.state.Items[1].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[2] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[2].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[2] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[2].Price} x
                                {this.state.Items[2].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[3] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[3].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[3] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[3].Price} x
                                {this.state.Items[3].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[4] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[4].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[4] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[4].Price} x
                                {this.state.Items[4].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[6] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[6].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[6] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[6].Price} x
                                {this.state.Items[6].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[7] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[7].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[7] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[7].Price} x
                                {this.state.Items[7].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[8] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[8].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[8] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[8].Price} x
                                {this.state.Items[8].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[9] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[9].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[9] === 0 ? 'Invisible' : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[9].Price} x
                                {this.state.Items[9].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[10] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[10].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[10] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[10].Price} x
                                {this.state.Items[10].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[11] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[11].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[11] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[11].Price} x
                                {this.state.Items[11].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[12] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[12].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[12] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[12].Price} x
                                {this.state.Items[12].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[13] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[13].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[13] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[13].Price} x
                                {this.state.Items[13].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[14] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[14].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[14] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[14].Price} x
                                {this.state.Items[14].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[15] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[15].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[15] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[15].Price} x
                                {this.state.Items[15].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[16] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[16].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[16] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[16].Price} x
                                {this.state.Items[16].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[17] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[17].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[17] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[17].Price} x
                                {this.state.Items[17].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[18] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[18].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[18] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[18].Price} x
                                {this.state.Items[18].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[19] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[19].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[19] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[19].Price} x
                                {this.state.Items[19].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[20] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[20].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[20] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[20].Price} x
                                {this.state.Items[20].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[21] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[21].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[21] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[21].Price} x
                                {this.state.Items[21].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[22] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[22].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[22] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[22].Price} x
                                {this.state.Items[22].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[23] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[23].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[23] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[23].Price} x
                                {this.state.Items[23].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[24] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[24].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[24] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[24].Price} x
                                {this.state.Items[24].Quantity}
                            </h1>

                            <h1
                                className={
                                    Nums[25] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                {this.state.Items[25].Name}
                            </h1>
                            <h1
                                className={
                                    Nums[25] === 0
                                        ? 'Invisible'
                                        : 'Receipt-Item'
                                }
                            >
                                {' '}
                                ${this.state.Items[25].Price} x
                                {this.state.Items[25].Quantity}
                            </h1>
                        </div>

                        <div className="Contain-Total-Receipt">
                            <h1 className="Total-Receipt"> Total: ${Total}</h1>
                        </div>
                    </div>

                    <div
                        className={
                            this.state.ShowBotton
                                ? 'receipt-boton-container'
                                : 'Invisible'
                        }
                    >
                        <button
                            className="receipt-boton"
                            onClick={this.checkOut}
                        >
                            Check Out
                        </button>
                        <button
                            className="receipt-boton"
                            onClick={this.backForm}
                        >
                            Back
                        </button>
                    </div>
                    <button
                        className={
                            this.state.ShowBotton
                                ? 'Invisible'
                                : 'receipt-boton'
                        }
                        onClick={this.newOrder}
                    >
                        New Order
                    </button>
                </div>

                <div className={this.state.Paying}>
                    <h1>
                        This is the check out for {this.state.PaymentMethod}
                    </h1>
                    <h1>
                        Let's figure all went right so click on continue if you
                        paid, if not just click on back to change something
                    </h1>
                    <div className="boton-checkout-container">
                        <button
                            className="boton-checkout"
                            onClick={this.showReceipt}
                        >
                            Back{' '}
                        </button>
                        <button
                            className="boton-checkout"
                            onClick={this.Finish}
                        >
                            Continue{' '}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders
