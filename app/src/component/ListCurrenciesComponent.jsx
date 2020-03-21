import React, { Component } from 'react'
import ApiService from "../service/ApiService";

class ListCurrenciesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            to: [],
            from: {},
            message: null
        }
        this.reloadCurrencyList = this.reloadCurrencyList.bind(this);
    }

    componentDidMount() {
        this.reloadCurrencyList();
    }

    reloadCurrencyList() {
        ApiService.fetchCurrencies()
            .then((res) => {
                this.setState({from: res.data.from})
                this.setState({to: res.data.to})
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Base Currency: GBP</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.to.map(
                        item =>
                                    <tr key={item.currency}>
                                        <td>{item.currency}</td>
                                        <td>{item.rate}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListCurrenciesComponent;