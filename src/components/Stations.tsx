import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import '../Stations.css';
import { fetchStations, getCurrentPosition, getJourneyInfo } from '../helpers/ApiCallHelper';
import { dateToString, minutesToHoursAndMinutes } from '../helpers/dateAndTimeFormatter';
import {
    ApiError,
    CurrentLocationType,
    GeoLocationPosition,
    JourneyType,
    OptionsType,
    StationType,
} from '../types/stationType';

const Stations: React.FC = () => {
    const [allStations, setAllStations] = useState<StationType[]>([]);
    const [fromStation, setFromStation] = useState<string>('');
    const [toStation, setToStation] = useState<string>('');
    const [journeyInfo, setJourneyInfo] = useState<JourneyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError>();

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            width: '200px',
        }),
        menuList: (provided: any, state: any) => ({
            ...provided,
            // Hide scrollbar for Chrome, Safari and Opera
            '::-webkit-scrollbar': {
                display: 'none',
            },
        }),
        option: (base: any) => ({
            ...base,
            width: '200px',
        }),
    };

    const euclideanDistance = (currentLocation: CurrentLocationType, station: StationType) => {
        return Math.sqrt(
            Math.pow(currentLocation.longitude - station.longitude, 2) +
                Math.pow(currentLocation.latitude - station.latitude, 2),
        );
    };

    const getClosestStation = async () => {
        setLoading(false);
        console.log('Getting current location');
        const position: GeoLocationPosition = await getCurrentPosition();
        const currentLocation: CurrentLocationType = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        };
        console.log('Current location: ', currentLocation);
        let minDistance = Infinity;
        allStations.forEach((station) => {
            const distance = euclideanDistance(currentLocation, station);

            if (distance < minDistance) {
                minDistance = distance;
                console.log('Closest station: ', station);
                setFromStation(station.crs);
            }
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(false);
        await getJourneyInfo(fromStation, toStation)
            .then((value) => {
                setJourneyInfo(value.outboundJourneys);
            })
            .catch((err) => {
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
            .finally(() => setLoading(true));
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
                                styles = { selectStyles }
                                value = { options.find(option => option.value === fromStation) }
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
                                styles = { selectStyles }
                                placeholder =  'Select To Station'
                            />
                        </div>
                    </div>
                    <div className = { 'stations-form-buttons' }>
                        <button className = { 'cool-button' } type = "submit">Submit</button>
                        <button className = { 'cool-button' } onClick = { getClosestStation }>Closest Station</button>
                    </div>

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
