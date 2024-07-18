import React, { useEffect, useState } from 'react';
import "./index.scss";
import Footer from '../../component/footer';
import Button from '../../component/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Buying_Ticket(id) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const paymentMethods = [
        { value: 'Paypal', label: 'PayPal' },
        { value: 'CreditCard', label: 'Credit Card' },
        { value: 'DebitCard', label: 'Debit Card' },
        { value: 'ApplePay', label: 'Apple Pay' },
        { value: 'GooglePay', label: 'Google Pay' },
        { value: 'Bitcoin', label: 'Bitcoin' }
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
            console.log(ticketsResponse);
            setEventDetailData(eventResponse.data);

            // Assuming ticketsResponse.data is an array of ticket objects with seat (containing row, number, isUsed) and ticketID
            const ticketData = ticketsResponse.data;

            // Create a map to group seats by row and sort by number within each row
            const seatMap = {};

            ticketData.forEach(ticket => {
                const { row, number, isUsed } = ticket.seat;
                if (!seatMap[row]) {
                    seatMap[row] = [];
                }

                seatMap[row].push({ label: `${row}${number}`, value: ticket.ticketID, isAvailable: ticket.seat.isAvailable });
            });

            // Sort rows alphabetically and numbers numerically within each row
            const sortedRows = Object.keys(seatMap).sort();
            const reconstructedSeats = sortedRows.map(row => {
                return seatMap[row].sort((a, b) => {
                    const numA = parseInt(a.label.slice(1));
                    const numB = parseInt(b.label.slice(1));
                    return numA - numB;
                });
            });

            setSeats(reconstructedSeats);

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
    useEffect(() => {
        fetchData();
    }, [params.id]);

    const handleSeatClick = (seat) => {
        if (seat.isUsed) return; // If the seat is used, do nothing

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
    useEffect(() => {
        console.log(seats);
    }, [seats]);
    const handlePay = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat!");
            return;
        }
        // Lưu thông tin ghế đã chọn vào state hoặc gửi lên server
        const orderDetails = selectedSeats.map(seat => ({
            ticketID: seat.value // `value` ở đây là ticketID của ghế đã cọn
        }));
        // Ví dụ: Bạn có thể gửi thông tin này lên server
        const requestData = {
            eventId: params.id, // Id của sự kiện
            orderDetails, // Mảng các đối tượng chứa `ticketID`
            hall: hall, // Tên phòng
            paymentMethod: selectedMethod, // Phương thức thanh toán đã chọn
            userID: user.user.userId // ID người dùng
        };
        // console.log("Request Data:", requestData);
        // Gửi request lên BE
        axios.post('https://eventgateapi.azurewebsites.net/api/Order', requestData)
            .then(response => {
                // Xử lý phản hồi từ server
                console.log("Response from server:", response.data);
                toast.success("Order successful");
                navigate("/payment/" + response.data);
                // alert("Seats selection saved successfully!");

            })
            .catch(error => {
                console.error("Error saving seats selection:", error);
                alert("There was an error saving your seats selection.");
            });
        // console.log(response.data);

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
                                buttonText="Order"
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
                                            className={`seat ${seat.value === null || !seat.isAvailable ? 'unavailable' : selectedSeats.some(selected => selected.label === seat.label) ? 'selected' : ''}`}
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

export default Buying_Ticket;