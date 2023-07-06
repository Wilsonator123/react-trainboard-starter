import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../Stations.css';
import { fetchStations, getJourneyInfo } from '../helpers/ApiCallHelper';
import { dateToString } from '../helpers/dateHelper';
import { ApiError, JourneyType, SelectStationOptionsType, StationType } from '../types/stationType';
import { OutboundTrainsView } from './outboundTrainsView';

const Stations: React.FC = () => {
    const [allStations, setAllStations] = useState<StationType[]>([]);
    const [fromStation, setFromStation] = useState<string>('');
    const [toStation, setToStation] = useState<string>('');
    const [journeyInfo, setJourneyInfo] = useState<JourneyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
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

    const options: SelectStationOptionsType[] = [];
    allStations.map(station => (
        options.push({ value: station.crs, label: station.name })
    ));

    useEffect(() => {
        setLoading(false);
        setAllStations([]);
        fetchStations()
            .then((value) => {
                value.stations.map((stations: StationType ) => {
                    setAllStations((prev) => [...prev, stations]);
                });
            })
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    return (
        <div className = "stations-container">

            <h1 id = "Welcome">Stations!</h1>
            <div>
                <form onSubmit = { handleSubmit } className = "stations-form">
                    <div>
                        <label htmlFor = "fromStation">From:</label>
                        <Select
                            onChange = { (options: SelectStationOptionsType | null) => {
                                if(options) {
                                    setFromStation(options.value);
                                }} }
                            options = { options }
                        />
                    </div>
                    <div>
                        <label htmlFor = "toStation">To:</label>
                        <Select
                            onChange = { (options: SelectStationOptionsType | null) => {
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
                {loading ? <OutboundTrainsView  journeyInfo = { journeyInfo }/> : null}
            </div>
        </div>
    );
};

export default Stations;
