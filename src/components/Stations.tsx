import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchStations, getJourneyInfo } from '../helpers/ApiCallHelper';
import { apiError, JourneyType, OptionsType, StationType } from '../types/stationType';

const Stations: React.FC = () => {
    const [allStations, setAllStations] = useState<StationType[]>([]);
    const [fromStation, setFromStation] = useState<string>('');
    const [toStation, setToStation] = useState<string>('');
    const [journeyInfo, setJourneyInfo] = useState<JourneyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<apiError>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(toStation);
        //window.location.href = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${selectedStations.fromStation}/${selectedStations.toStation}/#LiveDepResults`;
        await getJourneyInfo(fromStation, toStation)
            .then((value) => {
                console.log(value);
                setJourneyInfo(value.outboundJourneys);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            })
            .finally(() => setLoading(true));
    };

    const options: OptionsType[] = [];
    allStations.map(station => (
        options.push({ value: station.crsCode, label: station.stationName })
    ));

    useEffect(() => {
        setLoading(false);
        fetchStations()
            .then((value) => console.log(value))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
        setAllStations([
            {
                stationName: 'Northolt Park',
                crsCode: 'NLT',
            },
            {
                stationName: 'West Ruislip',
                crsCode: 'WRU',
            },
            {
                stationName: 'Wembley Central',
                crsCode: 'WCX',
            },
            {
                stationName: 'Marylebone',
                crsCode: 'MYB',
            },
            {
                stationName: 'High Wycombe',
                crsCode: 'HWY',
            },
            {
                stationName: 'Gerrards Cross',
                crsCode: 'GER',

            },
        ]);
    }, []);

    return (
        <div className = "stations-container">

            <h1 id = "Welcome">Stations!</h1>
            <div>
                <form onSubmit = { handleSubmit } className = "stations-form">
                    <div>
                        <label htmlFor = "fromStation">From:</label>
                        <Select
                            onChange = { (options: OptionsType | null) => {
                                if(options) {
                                    setFromStation(options.value);
                                }} }
                            options = { options }
                        />
                    </div>
                    <div>
                        <label htmlFor = "toStation">To:</label>
                        <Select
                            onChange = { (options: OptionsType | null) => {
                                if(options) {
                                    setToStation(options.value);
                                }
                            } }
                            options = { options }
                        />
                    </div>

                    <button type = "submit">Submit</button>
                </form>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Departure Platform</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Duration</th>
                            <th>Changes</th>
                            <th>Operator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && journeyInfo.map((journey) => (
                            <tr key = { journey.departureTime }>
                                <td> 7 </td>
                                <td>{new Date(journey.departureTime).toLocaleTimeString()}</td>
                                <td>{new Date(journey.arrivalTime).toLocaleTimeString()}</td>
                                <td>{journey.journeyDurationInMinutes}</td>
                                <td>{journey.legs.length - 1}</td>
                                <td>{journey.primaryTrainOperator.name}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stations;
