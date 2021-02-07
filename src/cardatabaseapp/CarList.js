import React, { Component } from 'react'
import axios from "axios";
import { SERVER_URL } from "./constant";
import ReactTable from "react-table-6";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import "react-table-6/react-table.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddCar from './AddCar'
import EditCar from './EditCar'

class CarList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cars: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        axios.get(SERVER_URL + "cars",{headers:{'Authorization' : sessionStorage.getItem("jwt")}})
            .then(response => this.setState({ cars: response.data }))
            .catch(error => console.log(error))
    }

    addCar = (car) => {
        axios.post(SERVER_URL + "addCar", car,{headers:{'Authorization' : sessionStorage.getItem("jwt")}})
            .then(response => this.fetchData())
            .catch(error => console.log(error))
    }

    updateCar = (car, id) => {
        axios.put(SERVER_URL + "updateCar/" + id, car,{headers:{'Authorization' : sessionStorage.getItem("jwt")}})
            .then(response => {
                toast.success("Car Updated", { position: toast.POSITION.BOTTOM_LEFT });
                this.fetchData()
            })
            .catch(error => console.log(error))
    }

    deleteHandler = (id) => {
        if (window.confirm("Are you sure to delete car?")) {
            console.log(id)
            axios.delete(SERVER_URL + "cars/" + id,{headers:{'Authorization' : sessionStorage.getItem("jwt")}})
                .then(response => {
                    toast.success("Car deleted.", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchData()
                })
                .catch(error => { toast.error("Error When Deleting!") })
        }
    }

    render() {
        const columns = [{
            Header: 'Brand',
            accessor: 'brand'
        }, {
            Header: 'Color',
            accessor: 'color',
        }, {
            Header: 'Year',
            accessor: 'year',
        }, {
            Header: 'Price €',
            accessor: 'price',
        }, {
            id: 'updateButton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({ row, value }) =><EditCar car={row} value={value} updateCar={this.updateCar}/>
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({ value }) => (<button onClick={() => { this.deleteHandler(value) }}>Delete</button>)
        }
        ]
        return (
            <div className="App">
                <h1>Car List App</h1>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            <AddCar addCar={this.addCar} fetchCars={this.fetchData} />
                            <ReactTable data={this.state.cars} columns={columns} filterable={true} />
                            <ToastContainer autoClose={1500} />
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CarList
