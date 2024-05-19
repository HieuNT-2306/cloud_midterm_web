import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function CustomRadioInput(props) {
    const { name, label, value, onChange, items} = props
    console.log(items);
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}
