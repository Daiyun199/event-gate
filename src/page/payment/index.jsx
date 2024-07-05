import React from 'react'
import "./index.scss"
import Button from '../../component/button'
function Payment() {
    return (
        <div className="payment-page">
            <h1>PAYMENT</h1>
            <div className="payment-page__content">
                <div className="payment-page__details">
                    <h2>Transaction Detail</h2>
                    <div className="table-container">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Event Name</td>
                                    <td>SkyTour-MTP</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>20$</td>
                                </tr>
                                <tr>
                                    <td>Payment Method</td>
                                    <td>MOMO</td>
                                </tr>
                                <tr>
                                    <td>User Name</td>
                                    <td>Crimson</td>
                                </tr>
                                <tr>
                                    <td>Gate</td>
                                    <td>HOJUDU2412</td>
                                </tr>
                                <tr>
                                    <td>Total Price</td>
                                    <td>15$</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-page__terms">
                        <label>
                            <input type="checkbox" required />
                            By continuing, you agree to the <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy Policy</a>.
                        </label>
                    </div>
                    {/* <button className="checkout-button">Checkout</button> */}
                    <Button customColor="black" variant='custom2' buttonText="Checkout" />
                </div>
                <div className="payment-page__qr">
                    <img src="https://toanhocbactrungnam.vn/uploads/news/2019_11/1573006985.png" alt="QR Code" />
                </div>
            </div>
        </div>
    )
}

export default Payment
