import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'; import './Home.css';
import useWindowSize from '../../hooks/useWindowSize';
import useWindowScroll from '../../hooks/useWindowScroll';

import BodyLarge from '../ts/BodyHome/BodyHome';
import BodySmall from '../ts/BodyHome/BodyHomeSmall';
import NavBar from '../Components/Header/NavBar';
import FooterHome from '../Components/Footer/Footer';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {

    return (
        <div className='grid'>
            <div className='z-40'> <NavBar /> </div>
            <div className='z-1 flex lg:hidden'> <BodySmall /> </div>
            <div className='z-1 hidden lg:flex'> <BodyLarge /> </div>
            <div><FooterHome /></div>
        </div >
    )
}

export default Home
