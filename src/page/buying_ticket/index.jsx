import React, { useState } from 'react'
import "./index.scss"
import Footer from '../../component/footer';
import Button from '../../component/button';

function Buying_Ticket() {
    const seats = [
        // Define seat rows
        ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
        ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
        ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
        ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
        // Add more rows as needed
    ];
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [hall, setHall] = useState('HallA');
    const [expirationDate] = useState('24/12/2024 12:00 P.M');
    const [price] = useState('20 $');

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };
    return (
        <div>
            <div className="ticket-booking">
                <h1>SkyTour-MTP</h1>
                <p className="location-time">
                    <span className="icon">📍</span> Location &nbsp; | &nbsp; <span className="icon">📅</span> Date Time
                </p>

                <div className="ticket-booking__content">
                    <div className="ticket-booking__details">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Seat</td>
                                    <td>{selectedSeat ? selectedSeat : 'Select a seat'}</td>
                                </tr>
                                <tr>
                                    <td>Hall</td>
                                    <td>
                                        <select value={hall} onChange={(e) => setHall(e.target.value)}>
                                            <option value="HallA">HallA</option>
                                            <option value="HallB">HallB</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Expiration Date</td>
                                    <td>{expirationDate}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{price}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='ticket-booking__details__button'>
                            <Button variant='custom2' buttonText="Pay" customColor="black" width="100%" />
                        </div>
                    </div>

                    <div className="ticket-booking__seating-chart">
                        <div className="seating-chart">
                            {seats.map((row, rowIndex) => (
                                <div key={rowIndex} className="seat-row">
                                    {row.map((seat) => (
                                        <div
                                            key={seat}
                                            className={`seat ${selectedSeat === seat ? 'selected' : ''}`}
                                            onClick={() => handleSeatClick(seat)}
                                        >
                                            {seat}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Buying_Ticket
