
export type StationType = {
    name: string;
    crs: string;
    longitude: number;
    latitude: number;
}

//Train operator type
export type OperatorType = {
    name: string;
    code: string;
}

//Make type for outbound journeys
export type JourneyType = {
    originStation: {
        displayName: string;
        crs: string;
    };
    destinationStation: {
        displayName: string;
        crs: string;
    };
    departureTime: string;
    arrivalTime: string;
    legs: Array<Leg>;
    journeyDurationInMinutes: number;
    departurePlatform: string;
    primaryTrainOperator: OperatorType;

}

export type Leg = {
    durationInMinutes: number;
    arrivalDateTime: string;
    departureDateTime: string;
    legId: string;
    trainOperator: OperatorType;
    destination: StationType;
    origin: {
        displayName: string;
        crs: string;
    };
}

export type ApiError = {
    error: string;
    error_description: string;
}

export type OptionsType = {
    value: string;
    label: string;
}

export type GeoLocationPosition = {
    coords: {
        latitude: number;
        longitude: number;
    }
}

export type CurrentLocationType = {
    latitude: number;
    longitude: number;
}
