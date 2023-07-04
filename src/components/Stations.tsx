import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStations } from '../helpers/ApiCallHelper';

const Stations: React.FC = () => {
    const [allStations, setAllStations] = useState<string[]>([]);
    const [selectedStations, setSelectedStations] = useState<{ fromStation: string; toStation: string }>({ fromStation: '', toStation: '' });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStations({ ...selectedStations, [event.target.name]: event.target.value });

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.location.href = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${selectedStations.fromStation}/${selectedStations.toStation}/#LiveDepResults`;
    };

    useEffect(() => {
        // fetchStations()
        //     .then((value) => console.log(value))
        //     .catch((err) => console.log(err))
        //     .finally(() => console.log('finally'));
        setAllStations(['NLT', 'WRU', 'WCX', 'MYB', 'HWY', 'GER']);
    }, []);

    return (
        <div className = "stations-container">

            <h1 id = "Welcome">Stations!</h1>
            <div >
                <form onSubmit = { handleSubmit } className = "stations-form">
                    <div>
                        <label htmlFor = "fromStation">From:</label>
                        <select key = { 'fromStation' } id = { 'fromStation' } name = { 'fromStation' } onChange = { handleChange }  >
                            {allStations.map(station => (
                                <option key = { station } value = { station }>{station}</option>
                            ))},
                        </select>
                    </div>
                    <div>
                        <label htmlFor = "toStation">To:</label>
                        <select id = { 'toStation' } name = { 'toStation' } onChange = { handleChange }  >
                            {allStations.map(station => (
                                <option key = { station } value = { station }>{station}</option>
                            ))},
                        </select>
                    </div>

                    <button type = "submit">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default Stations;
