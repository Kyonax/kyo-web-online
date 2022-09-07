import React, { useRef, useEffect, useState } from 'react'; import './BodyHome.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';

import useWindowSize from '../../../hooks/useWindowSize';
import useWindowScroll from '../../../hooks/useWindowScroll';

{/** Important Functions */ }

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

interface BodyProps { }

const Body: React.FC<BodyProps> = ({ }) => {     

    return (
       <div></div>
    )
}

export default Body
