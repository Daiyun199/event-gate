import React from 'react'
import "./index.scss"
import Button from '../../component/button'
import Carousel from '../../component/carousel'
import FilterBar from '../../component/filterbar'

function Home() {
    return (
        <div>
            <div className='home'>
                <div className="wrapper">
                    <div className="home__img">
                        {/* <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlFidZkpUZe9uWovxUUwWbVFWGYv-_KL9Hw&s"
                    /> */}
                    </div>
                    <div className="home__info">
                        <div className="home__info__tilte"></div>
                        <div className="home__info__intro"></div>
                        <div className="home__info__button">
                            <Button variant='custom2' buttonText='Get Started' customColor="#c94cb0" />
                            <Button variant='custom2' buttonText='Learn More' customColor="" borderStyle="0.5px solid white" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='search-bar'>
                <FilterBar />
            </div>
            <div className='box'>
                <div className='box__title'>
                    <span>UPCOMING EVENTS</span>
                </div>
            </div>
            <Carousel />
        </div>
    )
}

export default Home
