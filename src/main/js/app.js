// React and ReactDOM are the main libraries used to build the app
const React = require('react');
const ReactDOM = require('react-dom');

// client holds the custom code that configures rest.js to include support for HAL, URI Templates, etc.
// client also sets default Accept request header to application/hal+json
const client = require('./client');

import axios from 'axios'

// top level container for all React components
// extending React.Component to create a React component (React Components follow uppercase naming convention)
class App extends React.Component {

        constructor(props) {
                super(props);
                this.state = {stocks: [], oldStocks: [], stocksDictionary : {}, oldStocksDictionary: {}};
                //this.setChanges = this.setChanges.bind(this);
                this.firstFetch = true;
        }

    /**
      *  Fetches stock data from our Spring API.
      *  If we're not on the first fetch, compares the previously grabbed stock data with current stock data,
      *  and computes the total price change and percentage price change.
      *  These values are then stored inside of a state variable stocksDictionary.
      *  Another state variable, oldStocksDictionary, keeps a reference to the previous stocksDictionary after
      *  we fetch to compare the old price data and compute price changes mentioned above.
      */
        fetchData = () => {
            //making call to our API with axios
            axios.get('/api/stocks')
                .then(response => {
                    // creating a dictionary to hold our stock data
                    const stocksDictionary = {};
                    // oldStocksDictionary stores a reference to the stocksDictionary currently in state -
                    // this dictionary holds prices from previous call
                    const oldStocksDictionary = this.state.stocksDictionary;
                    const data = response.data._embedded.stocks;
                    data.map(stock => {
                    if(!this.firstFetch){
                     // if it's first time grabbing our stock data, this.state.stocksDictionary and thus
                     // oldStocksDictionary will be empty
                     // otherwise, we'll compute a total price change and pctChg for each stock using oldStocksDictionary
                     stock.change = Number(stock.price - oldStocksDictionary[stock._links.self.href].price).toFixed(3);
                     stock.pctChg = Number((1 - (oldStocksDictionary[stock._links.self.href].price/stock.price)) * 100).toFixed(3);
                     }
                     // we use the unique API link to each stock as a dictionary key
                     stocksDictionary[stock._links.self.href] = stock})

                    // once our first fetch is completed, change our flag variable
                    this.firstFetch = false;
                    // set our state variables of stocksDictionary and oldStocksDictionary to keep track of current and last prices
                    this.setState({stocksDictionary, oldStocksDictionary});
                })
                .catch(error => {
                     console.log(error);
                })
        }

        componentDidMount() {
                // we make an initial call to fetch data, and then call it on an interval every 5500 ms to get new data
                // from our API
                this.fetchData();
                this.interval = setInterval( () => {
                    this.fetchData()
                }, 5500);
        }

        // render() is the API to draw our component on the screen - it's called after our state is updated above
        // here we pass our stocksDictionary and oldStocksDictionary state variables down to our TickerBoard component
        render() {
                return (
                        <TickerBoard  stocksDictionary={this.state.stocksDictionary} oldStocksDictionary = {this.state.oldStocksDictionary}/>
                )
        }
}

// component for rendering table of stocks
class TickerBoard extends React.Component{

        render() {

                // mapping the keys from stocksDictionary to a Stock component containing a reference to the current
                // stock data - stocksDictionary[key], stored in "stock", and previous stock data - oldStocksDictionary[key],
                // stored in "oldStock"
                const stocks = Object.keys(this.props.stocksDictionary).map(key =>
                <Stock key={key} stock={this.props.stocksDictionary[key]} oldStock={this.props.oldStocksDictionary[key]}
                />);

                // then we return an HTML table wrapped around the array of stocks
                return (

                <div className="center-div">
                    <table className="table-striped">
                                    <thead>
                                        <tr>
                                             <th scope="col">Symbol</th>
                                             <th scope="col">Company Name </th>
                                             <th scope="col">Price</th>
                                             <th scope="col">Change</th>
                                             <th scope="col">Chg. %</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {stocks}
                                    </tbody>
                            </table>
                </div>
                )
        }
}
// component for rendering a single stock
class Stock extends React.Component{

    render() {
    // first we'll assign our default text color to black
    let color = 'black';
    let change = '';
    let pctChg = '';
    if(this.props.oldStock){
       // if our incoming price is less than our old price, the stock has lost,
       // so we set color to green
       if (this.props.oldStock.price > this.props.stock.price) {
            color = 'red';
            change = this.props.stock.change;
            pctChg = this.props.stock.pctChg;
       }
       // if our incoming price is greater than our old price, the stock has gained,
       // so we set color to green
       else if(this.props.oldStock.price < this.props.stock.price) {
            color = 'green';
            change = '+' + this.props.stock.change;
            pctChg = '+' + this.props.stock.pctChg;
       }

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
