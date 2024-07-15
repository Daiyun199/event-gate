import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Ticket_Detail() {
    const params = useParams();
    const [orderDetailData, setOrderDetailData] = useState(null);
    const [listTicket, setListTicket] = useState([]);
    const [qrCodes, setQrCodes] = useState([]); // State to store QR codes

    async function fetchTicket(ticketID) {
        try {
            const response = await axios.get(`https://eventgateapi.azurewebsites.net/api/Ticket/${ticketID}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch ticket with ID ${ticketID}`, error);
            return null;
        }
    }

    async function fetchData() {
        try {
            const orderResponse = await axios.get(`https://eventgateapi.azurewebsites.net/api/Order/byId/${params.id}`);
            const orderDetails = orderResponse.data.orderDetails;
            setOrderDetailData(orderDetails);

            const ticketPromises = orderDetails.map(detail => fetchTicket(detail.ticketID));
            const tickets = await Promise.all(ticketPromises);

            setListTicket(tickets.filter(ticket => ticket !== null));

            // Extract QR codes from tickets and set them in state
            const qrCodeData = tickets
                .filter(ticket => ticket !== null)
                .map(ticket => ticket.qrCodeBase64);

            setQrCodes(qrCodeData);

        } catch (error) {
            console.error('Failed to fetch order details', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Ticket Details</h1>
            <div className="qr-codes">
                {qrCodes.map((qrCode, index) => (
                    <div key={index}>
                        <img src={`data:image/png;base64,${qrCode}`} alt={`QR Code ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ticket_Detail;