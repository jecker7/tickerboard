// React and ReactDOM are the main libraries used to build the app
const React = require('react');
const ReactDOM = require('react-dom');

// client is the custom code that configures rest.js to include support for HAL, URI Templates, etc.
// client also sets default Accept request header to application/hal+json
const client = require('./client');

import axios from 'axios'
//import TickerBoard from './Tickerboard'

// top level container for all React components
// extending React.Component to create a React component (React Components follow uppercase naming convention)
class App extends React.Component {

        constructor(props) {
                super(props);
                this.state = {stocks: [], oldStocks: [], stocksDictionary : {}, oldStocksDictionary: {}};
                //this.setChanges = this.setChanges.bind(this);
                this.firstFetch = true;
        }

//        setChanges (change, pctChg, key) {
//
//                if (change && pctChg){
//                    let stocksDictionary = Object.assign({},this.state.stocksDictionary);
//                    console.log('change ', change, 'pct ', pctChg, 'sd ', stocksDictionary[key], 'key ', key);
//                    stocksDictionary[key]["change"] = change;
//                    stocksDictionary[key]["pctChg"] = pctChg;
//                    this.setState({stocksDictionary})
//                }
//                console.log('SD ', this.state.stocksDictionary);
//        }


        fetchData = () => {

            axios.get('/api/stocks')
                .then(response => {

                    const stocksDictionary = {};
                    const oldStocksDictionary = this.state.stocksDictionary;
                    const data = response.data._embedded.stocks;
                    data.map(stock => {
                    if(!this.firstFetch){
                     console.log('osd ', oldStocksDictionary, 'price ', stock.price, 'key ', stock._links.self.href);
                     console.log('osd[key] ', oldStocksDictionary[stock._links.self.href].price);
                     stock.change = Number(stock.price - oldStocksDictionary[stock._links.self.href].price).toFixed(3);
                     stock.pctChg = Number((1 - (oldStocksDictionary[stock._links.self.href].price/stock.price)) * 100).toFixed(3);
                            // change +=  Number(this.props.stock.price - this.props.oldStock.price).toFixed(3).toString();
       // pctChg += Number((1 - (this.props.oldStock.price / this.props.stock.price)) * 100).toFixed(3).toString();
                     console.log('change ', stock.change, 'pctchg ', stock.pctChg);
                     }
                     stocksDictionary[stock._links.self.href] = stock})

                    this.firstFetch = false;
                    this.setState({stocksDictionary, oldStocksDictionary});

                })
                .catch(error => {
                     console.log(error);
                })
        }

        // invoking our API after React renders our component in the DOM
        // here we fetch an array of employees from the Spring Data REST backend,
        // and store the array in this components state data - state data is data the component handles itself
        componentDidMount() {

        // our function loads data using client, a Promise compliant instance of rest.js
//                client({method: 'GET', path: '/api/stocks'}).done(response => {
//                        this.setState({stocks: response.entity._embedded.stocks});
//                });
                this.fetchData();
                this.interval = setInterval( () => {
                    this.fetchData()
                }, 5500);
        }

        // render() is the API to draw our component on the screen - it's called after our state is updated above
        // stock state data is used to create a <StockList /> React component
        render() {
                return (
                /*setChanges={this.setChanges}*/
                        <TickerBoard  stocksDictionary={this.state.stocksDictionary} oldStocksDictionary = {this.state.oldStocksDictionary}/>
                )
        }
}

// component for rendering table of stocks
class TickerBoard extends React.Component{

        render() {


                // setChanges = {this.props.setChanges}

                // using map function to transform this.props.stocks from array of stocks to an array of <Element />
                // React components, and creating a new React component along with two properties: key, and data,
                // which are supplied the values from employee._links.self.href and employee
                // the "self" link is our unique key in Spring for stocks, and can be used as a unique identifier for React child nodes
                const stocks = Object.keys(this.props.stocksDictionary).map(key =>
                <Stock key={key} stock={this.props.stocksDictionary[key]} oldStock={this.props.oldStocksDictionary[key]}
                />);



                // we'll return an HTML table wrapped around the array of stocks
                return (
                            <table>
                                    <tbody>
                                            <tr>
                                                   <th>Symbol</th>
                                                   <th>Company Name</th>
                                                   <th>Price</th>
                                                   <th>Change</th>
                                                   <th>Chg. %</th>
                                            </tr>
                                            {stocks}
                                    </tbody>
                            </table>
                )
        }
}
// component for rendering a single stock
class Stock extends React.Component{


    render() {

    console.log(this.props);
    let color = 'black';
    let change = '';
    let pctChg = '';
    if(this.props.oldStock){
       if (this.props.oldStock.price > this.props.stock.price) {
            color = 'red';
            change = this.props.stock.change;
            pctChg = this.props.stock.pctChg;
       }
       else if(this.props.oldStock.price < this.props.stock.price) {
            color = 'green';
            change = '+' + this.props.stock.change;
            pctChg = '+' + this.props.stock.pctChg;
       }
       // change +=  Number(this.props.stock.price - this.props.oldStock.price).toFixed(3).toString();
       // pctChg += Number((1 - (this.props.oldStock.price / this.props.stock.price)) * 100).toFixed(3).toString();

       // this.props.setChanges(change, pctChg, this.props.stock._links.self.href);
        console.log(this.props.stock);
      }


            return (
                    <tr>
                            <td>{this.props.stock.symbol}</td>
                            <td>{this.props.stock.name}</td>
                            <td style= {{color}} >{Number((this.props.stock.price).toFixed(3))}</td>
                            <td style={{color}} >{change}</td>
                            <td style={{color}} >{pctChg}</td>
                    </tr>
                )
            }
}

// rendering code to our react div in index
ReactDOM.render(
        <App />,
        document.getElementById('react')
)
