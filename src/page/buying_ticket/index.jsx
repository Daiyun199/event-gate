import React, { useEffect, useState } from 'react'
import "./index.scss"
import Footer from '../../component/footer';
import Button from '../../component/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Buying_Ticket(id) {
    const user = useSelector((state) => state.user);
    const [seats, setSeats] = useState([
        // Define seat rows with default values
        [{ label: 'A1', value: null }, { label: 'A2', value: null }, { label: 'A3', value: null }, { label: 'A4', value: null }, { label: 'A5', value: null }, { label: 'A6', value: null }],
        [{ label: 'B1', value: null }, { label: 'B2', value: null }, { label: 'B3', value: null }, { label: 'B4', value: null }, { label: 'B5', value: null }, { label: 'B6', value: null }],
        [{ label: 'C1', value: null }, { label: 'C2', value: null }, { label: 'C3', value: null }, { label: 'C4', value: null }, { label: 'C5', value: null }, { label: 'C6', value: null }],
        [{ label: 'D1', value: null }, { label: 'D2', value: null }, { label: 'D3', value: null }, { label: 'D4', value: null }, { label: 'D5', value: null }, { label: 'D6', value: null }],
        [{ label: 'E1', value: null }, { label: 'E2', value: null }, { label: 'E3', value: null }, { label: 'E4', value: null }, { label: 'E5', value: null }, { label: 'E6', value: null }],
        // Add more rows as needed
    ]);
    const paymentMethods = [
        { value: 'paypal', label: 'PayPal' },
        { value: 'creditCard', label: 'Credit Card' },
        { value: 'debitCard', label: 'Debit Card' },
        { value: 'applePay', label: 'Apple Pay' },
        { value: 'googlePay', label: 'Google Pay' },
        { value: 'bitcoin', label: 'Bitcoin' }
    ];
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].value);
    const [hall, setHall] = useState('HallA');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [eventDetailData, setEventDetailData] = useState([]);
    const params = useParams();
    async function fetchData() {
        try {
            const eventResponse = await axios.get(`https://eventgateapi.azurewebsites.net/api/event/${params.id}`);
            const ticketsResponse = await axios.get(`https://eventgateapi.azurewebsites.net/api/Event/${params.id}/tickets`);

            setEventDetailData(eventResponse.data);

            // Assuming ticketsResponse.data is an array of ticket objects with ticketID
            const ticketData = ticketsResponse.data;

            // Flat map seats into a single array to easily assign ticketID by index
            const flattenedSeats = seats.flat();

            // Map ticketIDs to seats
            const updatedSeats = flattenedSeats.map((seat, index) => ({
                ...seat,
                value: ticketData[index] ? ticketData[index].ticketID : null // Assign ticketID if available, otherwise null
            }));

            // Reconstruct the 2D seat array structure
            const reconstructedSeats = [];
            let seatIndex = 0;
            for (let i = 0; i < seats.length; i++) {
                const row = [];
                for (let j = 0; j < seats[i].length; j++) {
                    row.push(updatedSeats[seatIndex]);
                    seatIndex++;
                }
                reconstructedSeats.push(row);
            }

            setSeats(reconstructedSeats);
            console.log(updatedSeats);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const handleChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    useEffect(function () {
        fetchData();
    }, []);
    const handleSeatClick = (seat) => {
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.some(selected => selected.label === seat.label)) {
                // Remove seat if it's already selected
                return prevSelectedSeats.filter(selected => selected.label !== seat.label);
            } else {
                // Add seat if it's not selected yet
                return [...prevSelectedSeats, seat];
            }
        });
    };
    const handlePay = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat!");
            return;
        }


        // Lưu thông tin ghế đã chọn vào state hoặc gửi lên server
        const orderDetails = selectedSeats.map(seat => ({
            ticketID: seat.value // `value` ở đây là ticketID của ghế đã chọn
        }));

        // Ví dụ: Bạn có thể gửi thông tin này lên server
        const requestData = {
            eventId: params.id, // Id của sự kiện
            orderDetails, // Mảng các đối tượng chứa `ticketID`
            hall: hall, // Tên phòng
            paymentMethod: selectedMethod, // Phương thức thanh toán đã chọn
            userID: user.user.userId // ID người dùng
        };

        console.log("Request Data:", requestData);

        // Gửi request lên BE
        axios.post('https://eventgateapi.azurewebsites.net/api/Order', requestData)
            .then(response => {
                // Xử lý phản hồi từ server
                console.log("Response from server:", response.data);
                alert("Seats selection saved successfully!");
            })
            .catch(error => {
                console.error("Error saving seats selection:", error);
                alert("There was an error saving your seats selection.");
            });
    };
    return (
        <div>
            <div className="ticket-booking">
                <h1>{eventDetailData.eventName}</h1>
                <p className="location-time">
                    <span className="icon">📍</span> {eventDetailData.location} &nbsp; | &nbsp; <span className="icon">📅</span> {eventDetailData.startDate}
                </p>

                <div className="ticket-booking__content">
                    <div className="ticket-booking__details">
                        <table>
                            <tbody>
                                <td>Seat(s)</td>
                                <td>
                                    {selectedSeats.length > 0
                                        ? selectedSeats.map(seat => seat.label).join(', ')
                                        : 'Select seats'}
                                </td>
                                <tr>
                                    <td>Payment Method</td>
                                    <td>
                                        <select id="paymentSelect" value={selectedMethod} onChange={handleChange}>
                                            {paymentMethods.map((method) => (
                                                <option key={method.value} value={method.value}>
                                                    {method.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Expiration Date</td>
                                    <td>{eventDetailData.endDate}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{eventDetailData.price * selectedSeats.length}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='ticket-booking__details__button'>
                            <Button
                                variant='custom2'
                                buttonText="Pay"
                                customColor="black"
                                width="100%"
                                onClick={handlePay} // Thêm sự kiện onClick vào nút
                            />
                        </div>
                    </div>

                    <div className="ticket-booking__seating-chart">
                        <div className="seating-chart">
                            {seats.map((row, rowIndex) => (
                                <div key={rowIndex} className="seat-row">
                                    {row.map((seat, seatIndex) => (
                                        <div
                                            key={seat.label}
                                            className={`seat ${seat.value === null ? 'unavailable' : selectedSeats.some(selected => selected.label === seat.label) ? 'selected' : ''}`}
                                            onClick={() => seat.value !== null && handleSeatClick(seat)}
                                        >
                                            {seat.label}
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
