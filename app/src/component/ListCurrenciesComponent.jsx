import React, { Component } from 'react'
import ApiService from "../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
                <Typography variant="h7" style={titleStyle}>Base Currency: {this.state.from.currency}</Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerStyle}>Currency</TableCell>
                            <TableCell style={headerStyle}>Rate</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.to.map(row => (
                            <TableRow key={row.currency}>
                                <TableCell component="th" scope="row">
                                    {row.currency}
                                </TableCell>
                                <TableCell>{row.rate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

}

const titleStyle ={
    display: 'flex',
    margin: '20px',
    marginLeft: '16px'
}

const headerStyle = {
    fontWeight: 'bold'
}

export default ListCurrenciesComponent;