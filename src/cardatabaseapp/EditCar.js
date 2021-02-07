import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'

const EditCar = (props) => {

    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({ brand: '', color: '', year: '', price: '' })

    const handleOpen = () => {
        setCar({brand: props.car.brand, color: props.car.color,
            year: props.car.year, registerNumber: props.car.registerNumber, price: props.car.price })
            console.log(car)
          setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        props.updateCar(car, props.value)
        handleClose()
    }

    return (
        <div>
            <button onClick={handleOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <input type="text" placeholder="Brand" name="brand"
                        value={car.brand} onChange={handleChange} /><br />
                    <input type="text" placeholder="RegisterNumber" name="registerNumber"
                        value={car.model} onChange={handleChange} /><br />
                    <input type="text" placeholder="Color" name="color"
                        value={car.color} onChange={handleChange} /><br />
                    <input type="text" placeholder="Year" name="year"
                        value={car.year} onChange={handleChange} /><br />
                    <input type="text" placeholder="Price" name="price"
                        value={car.price} onChange={handleChange} /><br />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCar
