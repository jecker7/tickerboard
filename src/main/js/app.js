// React and ReactDOM are the main libraries used to build the app
const React = require('react');
const ReactDOM = require('react-dom');

// client is the custom code that configures rest.js to include support for HAL, URI Templates, etc.
// client also sets default Accept request header to application/hal+json
const client = require('./client');

import axios from 'axios'

// top level container for all React components
// extending React.Component to create a React component (React Components follow uppercase naming convention)
class App extends React.Component {

        constructor(props) {
                super(props);
                this.state = {stocks: [], oldStocks: [], stocksDictionary : {}, oldStocksDictionary: {}};
        }

        fetchData = () => {
            axios.get('/api/stocks')
                .then(response => {
                    const stocksDictionary = {};
                    const oldStocksDictionary = this.state.stocksDictionary;
                    const data = response.data._embedded.stocks;
                    data.map(stock => { stocksDictionary[stock._links.self.href] = stock})
                    this.setState({stocksDictionary, oldStocksDictionary});
                    console.log(this.state.oldStocks);

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
                }, 10000);
        }

        // render() is the API to draw our component on the screen - it's called after our state is updated above
        // stock state data is used to create a <StockList /> React component
        render() {
                return (
                        <TickerBoard stocksDictionary={this.state.stocksDictionary} oldStocksDictionary = {this.state.oldStocksDictionary}/>
                )
        }
}

// component for rendering table of stocks
class TickerBoard extends React.Component{
        render() {
                // using map function to transform this.props.stocks from array of stocks to an array of <Element />
                // React components, and creating a new React component along with two properties: key, and data,
                // which are supplied the values from employee._links.self.href and employee
                // the "self" link is our unique key in Spring for stocks, and can be used as a unique identifier for React child nodes
                console.log(this.props);

                const stocks = Object.keys(this.props.stocksDictionary).map(key =>
                        <Stock key={key} stock={this.props.stocksDictionary[key]} oldStock={this.props.oldStocksDictionary[key]}/>
                );


                // we'll return an HTML table wrapped around the array of stocks
                return (
                            <table>
                                    <tbody>
                                            <tr>
                                                   <th>Company Name</th>
                                                   <th>Symbol</th>
                                                   <th>Price</th>
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
    let color = 'white';
    if(this.props.oldStock){
       if (this.props.oldStock.price > this.props.stock.price) {
            color = 'red';
       }
       else if(this.props.oldStock.price < this.props.stock.price) {
            color = 'green';
       }
      }
            return (
                    <tr>
                            <td>{this.props.stock.name}</td>
                            <td>{this.props.stock.symbol}</td>
                            <td style= {{color}} >{Number((this.props.stock.price).toFixed(3))}</td>
                    </tr>
                )
            }
}

// rendering code to our react div in index
ReactDOM.render(
        <App />,
        document.getElementById('react')
)
