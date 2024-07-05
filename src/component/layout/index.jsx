/* eslint-disable react/prop-types */

import Footer from '../footer'
import Header from '../header'
import { Outlet } from 'react-router-dom'

function Layout({ showRight, backgroundColor, position = "relative" }) {
    return (
        <div>
            <Header showRight={showRight} backgroundColor={backgroundColor} position={position} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
