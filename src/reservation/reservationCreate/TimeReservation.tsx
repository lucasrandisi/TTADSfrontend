import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { GET_AVAILABLE_TABLES } from 'reservation/queries/ReservationQuery';
import { useQuery } from "@apollo/client";
import moment from 'moment';

export default function TimeReservation(
    { 
        setTimeReservation,
        partySize,
        reservationDate,
        setAvailableTable,
        timeReservation,
        setDisable
    }) { 

    
    const { loading, error, data } = useQuery(GET_AVAILABLE_TABLES, {
        variables: {
            size: partySize,
            date: moment(reservationDate).format("YYYY-MM-DD"),
        }
    });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! {error.message}</p>;

    const available_times = data.tablesAvailableByDateSize;

    const setTableId = () => {
        try {
            const booking_table = available_times.filter((t) => t.time === timeReservation)[0];
            console.log(booking_table)
            return booking_table.tableId;
        } catch (error) {
            return error.message;
        }

    }

    setAvailableTable(setTableId());
    
    const handleChange = event => {
        setTimeReservation(event.target.value);
        setAvailableTable(setTableId());
    };

    const isAvailable = available_times.length === 0;
    setDisable(isAvailable);
    return (
        <>
            <div>
                <FormControl component="fieldset">
                    {isAvailable ? <p>No tables available</p> : <p>Select a time</p>}
                    <RadioGroup
                        value={timeReservation}
                        onChange={handleChange}
                        className='container-booking-time'
                    >                        
                        {available_times.map((t, index) => {
                            return <FormControlLabel        
                                key={index}                         
                                value={t.time} 
                                control={<Radio />} 
                                label={`${t.time} HS`} 
                                className="individual-booking-time"
                            />
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        </>
    )
}
