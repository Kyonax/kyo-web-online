import React from 'react';

import KLogo from '../../../assets/ts/KLogo';
import YLogo from '../../../assets/ts/YLogo';
import OLogo from '../../../assets/ts/OLogo';

interface BodyProps {

}

const Body: React.FC<BodyProps> = ({ }) => {
    return (
        <div>
            <div className="flex flex-wrap place-content-center gap-3">
                <div><KLogo width="300px" heigth="300px" /></div>
                <div className='mt-[-1.2rem]'><YLogo width="300px" heigth="300px" /></div>
                <div className='mt-[-1.95rem]'><OLogo width="300px" heigth="300px" /></div>
            </div>
        </div>
    )
}

export default Body
