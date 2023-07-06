import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import '../Stations.css';
import { fetchStations, getJourneyInfo } from '../helpers/ApiCallHelper';
import { dateToString, minutesToHoursAndMinutes } from '../helpers/dateAndTimeFormatter';
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
        setLoading(false);
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
                    <div className = { 'selectStationOptions' }>
                        <div className = { 'fromStationChoice' }>
                            <Select
                                onChange = { (options: OptionsType | null) => {
                                    if(options) {
                                        setFromStation(options.value);
                                    }} }
                                options = { options }
                                placeholder =  'Select From Station'
                            />
                        </div>
                        <div className = { 'toStationChoice' }>
                            <Select
                                onChange = { (options: OptionsType | null) => {
                                    if(options) {
                                        setToStation(options.value);
                                    }
                                } }
                                options = { options }
                                placeholder =  'Select To Station'
                            />
                        </div>
                    </div>
                    <button className = { 'cool-button' } type = "submit">Submit</button>
                </form>
            </div>
            <div className = { 'journeyContainer' }>

                {loading && journeyInfo.map((journey: JourneyType) => (
                    <div key = { journey.originStation.crs } className = { 'journeyDisplay' }>
                        <div className = { 'journeyMain' }>
                            <div className = { 'departureTime' }>{dateToString(new Date(journey.departureTime))}</div>
                            <div>➔</div>
                            <div className = { 'arrivalTime' }>{dateToString(new Date(journey.arrivalTime))}</div>
                            <div className = { 'platformInfo' }>Platform 9¾, {
                                journey.legs.length-1>0? `Changes: ${journey.legs.length-1}` : 'Direct'
                            }</div>
                            <div className = 'sideInfo'>
                                <div>{minutesToHoursAndMinutes(journey.journeyDurationInMinutes)}</div>
                            </div>
                            <div className = { 'destinationInfo' }>
                                <div>From {journey.originStation.displayName} to {journey.destinationStation.displayName}</div>
                            </div>
                            <div className = { 'trainImage' }>
                                <img src = { 'https://media.forbiddenplanet.com/products/73/47/4e4aac4bb781cb39b345b6e371a2f9ac6992.png' } width = { 100 } height = { 100 }/>
                            </div>
                        </div>
                        <div className = { 'journeyFooter' }>{journey.primaryTrainOperator.name}</div>

                    </div>),
                )}

            </div>
        </div>
    );
};

export default Stations;
