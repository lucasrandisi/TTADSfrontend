import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { GET_RESERVATIONS_BY_DATE } from 'reservation/queries/ReservationQuery';
import { useQuery } from "@apollo/client";
import moment from "moment";

export default function TimeReservation(
    { 
        timeReservation, 
        setTimeReservation, 
        times,
        partySize,
        reservationDate
    }) {


    const [state, setState] = useState("19:00");

    const { loading, error, data } = useQuery(GET_RESERVATIONS_BY_DATE, {
		variables: { 
            size: partySize,
            reservationDate: moment(reservationDate).format("YYYY-MM-DD"),
        },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! {error.message}</p>;

    const available_times = () => {
        return data.reservationsByDate.filter(({reservationDateTime}) => {
            const time = moment(reservationDateTime).add(3, 'hours').format("HH:mm")
            return !times.includes(time);
        })
    }

    const handleChange = event => {
        setState(event.target.value) ;
        setTimeReservation(event.target.value)
    };

    return (
        <>
            <div>
                <FormControl component="fieldset">
                    <p>Select a time</p>
                    <RadioGroup
                        value={timeReservation}
                        onChange={handleChange}
                        className='container-booking-time'
                    >
                        {times.map((t, index) => {
                            return <FormControlLabel        
                                key={index}                         
                                value={t} 
                                control={<Radio />} 
                                label={`${t} HS`} 
                                className="individual-booking-time"
                            />
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        </>
    )
}
