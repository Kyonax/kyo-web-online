import React from 'react';

import Body from '../ts/BodyHome/BodyHome';
import NavBar from '../Components/Header/NavBar';
import FooterHome from '../Components/Footer/Footer';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {
    return (
        <div className='grid'>
            <div className='z-40'><NavBar /></div>
            <div className='z-1'><Body /></div>
            <div><FooterHome /></div>
        </div >
    )
}

export default Home
