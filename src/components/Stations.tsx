import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../Stations.css';
import { fetchStations, getJourneyInfo } from '../helpers/ApiCallHelper';
import { dateToString } from '../helpers/dateHelper';
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
        //window.location.href = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${selectedStations.fromStation}/${selectedStations.toStation}/#LiveDepResults`;
        await getJourneyInfo(fromStation, toStation)
            .then((value) => {
                console.log('here '+value.outboundJourneys[0].originStation.displayName);
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
                {loading && journeyInfo.map((journey: JourneyType) => (
                    <div key = { journey.originStation.crs } >
                        <div className={ 'departureTime' }>{dateToString(new Date(journey.departureTime))}</div>
                        <div className={ 'arrivalTime' }>{dateToString(new Date(journey.arrivalTime))}</div>
                        <div>{journey.journeyDurationInMinutes}</div>
                        <div>{journey.legs.length - 1}</div>
                        <div>{journey.primaryTrainOperator.name}</div>
                        <div>From {journey.originStation.name} to {journey.destinationStation.name}</div>
                    </div> ),
                )}

            </div>
        </div>
    );
};

export default Stations;
