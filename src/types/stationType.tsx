
export type StationType = {
    name: string;
    crs: string;
}

export type OperatorType = {
    name: string;
    code: string;
}

export type JourneyType = {
    originStation: StationType;
    destinationStation: StationType;
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
    origin: StationType;
}

export type ApiError = {
    error: string;
    error_description: string;
}

export type SelectStationOptionsType = {
    value: string;
    label: string;
}