export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    }).then((response) => response.json());
};

export const getJourneyInfo = (originStation: string, destinationStation: string) => {
    const url = 'https://mobile-api-softwire2.lner.co.uk/v1/fares?';

    const params = new URLSearchParams({
        originStation: originStation,
        destinationStation: destinationStation,
        noChanges: 'false',
        numberOfAdults: '2',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2023-08-01T12:00:00',
        outboundIsArriveBy: 'false',
    });

    const urlWithParams = `${url}${params.toString()}`;

    return fetch(urlWithParams, {
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

