import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'

const AddCar = (props) => {
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({ brand: '', color: '', registerNumber: '', year: '', price: '' })

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleSave=()=>{
        props.addCar(car)
        props.fetchCars()
        handleClose()
    }

    return (
        <div>
            <button onClick={handleOpen}>Add New Car</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle value="New Car" />
                <DialogContent>
                    <input type="text" placeholder="Brand" name="brand" value={car.brand} onChange={handleChange} />
                    <input type="text" placeholder="Color" name="color" value={car.color} onChange={handleChange} />
                    <input type="text" placeholder="RegisterNumber" name="registerNumber" value={car.registerNumber} onChange={handleChange} />
                    <input type="text" placeholder="Year" name="year" value={car.year} onChange={handleChange} />
                    <input type="text" placeholder="Price" name="price" value={car.price} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCar