// React and ReactDOM are the main libraries used to build the app
const React = require('react');
const ReactDOM = require('react-dom');

// client is the custom code that configures rest.js to include support for HAL, URI Templates, etc.
// client also sets default Accept request header to application/hal+json
const client = require('./client');


// top level container for all React components
// extending React.Component to create a React component (React Components follow uppercase naming convention)
class App extends React.Component {

        constructor(props) {
                super(props);
                this.state = {stocks: []};
        }
        // invoking our API after React renders our component in the DOM
        componentDidMount() {
                client({method: 'GET', path: 'api/stocks'}).done(response => {
                        this.setState({stocks: response.entity._embedded.stocks});
                });
        }

        // render() is the API to draw our component on the screen
        render() {
                return (
                        <StockList stocks = {this.state.stocks}/>
                )
        }
}