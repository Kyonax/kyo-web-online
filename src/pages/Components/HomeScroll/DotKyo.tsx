import React, { useEffect, useState } from 'react';
import TypeWriter from "typewriter-effect"; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeIn, FadeOut, batch, Move, MoveOut, MoveIn } from 'react-scroll-motion';
import { motion } from 'framer-motion';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import KyonaxLogo from '../../../assets/ts/KyonaxLogo';

{/** Important Functions */ }

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

interface DotKyoProps {

}

const DotKyo: React.FC<DotKyoProps> = ({ }) => {
    {/** Page Effects */ }
    const [windowSize, setWindowSize] = useState(getWindowSize()), [width_full_stack, set_width_full_stack] = useState(205),
        [size_full_stack, set_size_full_stack] = useState(`12px`), [width_portfolio, set_width_portfolio] = useState(115),
        [size_portfolio, set_size_portfolio] = useState(`12px`), [p_full_stack, set_p_full_stack] = useState(`1`),
        [p_portfolio, set_p_portfolio] = useState(`1`);


    {/** Functions Deployable */ }
    useEffect(() => {
        function handleWindowResize() { setWindowSize(getWindowSize()); }
        window.addEventListener('resize', handleWindowResize);

        return () => { window.removeEventListener('resize', handleWindowResize); };
    }, [])

    useEffect(() => {
        if (windowSize.innerWidth <= 1024 && windowSize.innerWidth > 768) {
            set_width_full_stack(205); set_size_full_stack(`9px`); set_p_full_stack(`2`);
        } else if (windowSize.innerWidth <= 768) {
            set_width_full_stack(205); set_size_full_stack(`9px`); set_p_full_stack(`2`);
        } else { set_width_full_stack(205); set_size_full_stack(`12px`); set_p_full_stack(`1`); }
    })


    return (
        <div className='h-screen grid grid-cols-1 lg:grid-cols-4 place-content-end mb-[22rem] text-[#f9f9f9]'>

            <div className='grid p-4 col-span-3 place-content-center text-start bg-[#0f0f0f]'>
                <div className='grid'>
                    <div className='text-title grid text-2xl md:text-4xl lg:text-5xl'>
                        <span>LA MAGIA DEL</span>
                        <span className='text-[2.3rem] md:text-[3rem] lg:text-[4rem] mt-[-.25rem] lg:mt-[-.5rem]'>DESARROLLO</span>
                    </div>
                    <div className='flex'>
                        <span className='text-[11px] md:text-[13px] lg:text-[14px]'>
                            Mi experiencia en 5 años desarrollando aplicaciones, páginas web, bots automatizados, y tecnología decentralizada me ha llevado a evolucionar, aprender y mejorar como desarrollador.
                        </span>
                    </div>

                    <div className='flex flex-wrap mt-3'>
                        <div className='w-2/3 lg:w-1/2 flex'>

                            <div className='flex'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: width_full_stack }} className='overflow-hidden place-content-start'>
                                        <Link to={'/dotkyo_desarrollador_web'}>
                                            <span className={`text-[${size_full_stack}] flex p-${p_full_stack} hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]`}>DESARROLLADOR FULL-STACK <div className='hidden lg:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>


                            <div className='hidden lg:flex'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 115 }} className='overflow-hidden place-content-start ml-6'>
                                        <Link to={'/dotkyo_portafolio_web_developer'}>
                                            <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>PORTAFOLIO <div className='hidden lg:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                            <div className='flex lg:hidden ml-3 bg-black'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 80 }} className='overflow-hidden place-content-start ml-0'>
                                        <Link to={'/dotkyo_portafolio_web_developer'}>
                                            <span className='text-[9px] md:text-[10px] flex p-2 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-full'>PORTAFOLIO <div className='hidden lg:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                        </div>

                        <div className='hidden lg:flex place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'43px'} heigth='auto' version='dotkyo' size='lg' color={"color"} />
                        </div>

                        <div className='flex lg:hidden place-content-end pr-6 w-1/3'>
                            <KyonaxLogo width={'35px'} heigth='auto' version='dotkyo' size='lg' color={"color"} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DotKyo
