import React from 'react';
import { dateToString } from '../helpers/dateHelper';
import { JourneyType } from '../types/stationType';

type OutboundTrainsViewProps = {
    journeyInfo: JourneyType[];
}

export const OutboundTrainsView: React.FC<OutboundTrainsViewProps> = ( { journeyInfo }) => {
    return (
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
                    {journeyInfo.map((journey: JourneyType) => (
                        <tr key = { journey.departureTime }>
                            <td> 7</td>
                            <td>{dateToString(new Date(journey.departureTime))}</td>
                            <td>{dateToString(new Date(journey.arrivalTime))}</td>
                            <td>{journey.journeyDurationInMinutes}</td>
                            <td>{journey.legs.length - 1}</td>
                            <td>{journey.primaryTrainOperator.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};