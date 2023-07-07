import { GeoLocationPosition } from '../types/stationType';

export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    }).then((response) => response.json());
};

export const getJourneyInfo = (originStation: string, destinationStation: string) => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/fares?'+ new URLSearchParams({
        originStation: originStation,
        destinationStation: destinationStation,
        noChanges: 'false',
        numberOfAdults: '2',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2023-08-01T12:00:00',

        outboundIsArriveBy: 'false',
    }), {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    }).then((response) => {
        if(response.status!==200) {throw response.json();}
        return response.json();
    }).catch((error) => {
        console.log('');
    });
};

export const getCurrentPosition = () => {
    return new Promise<GeoLocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};