import React, { useEffect } from 'react'; import './DotKyo.css';
import TypeWriter from "typewriter-effect"; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeIn, FadeOut, batch, Move, MoveOut, MoveIn } from 'react-scroll-motion';
import { motion } from 'framer-motion';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import KyonaxLogo from '../../../assets/ts/KyonaxLogo';


interface DotKyoProps {

}

const DotKyo: React.FC<DotKyoProps> = ({ }) => {

    return (
        <div className='h-screen grid grid-cols-4 place-content-end mb-[22rem] text-[#f9f9f9]'>

            <div className='grid p-4 col-span-3 place-content-center text-start bg-[#0f0f0f]'>
                <div className='grid'>
                    <div className='text-title grid text-5xl'>
                        <span>LA MAGIA DEL</span>
                        <span className='text-[4rem] mt-[-.5rem]'>DESARROLLO</span>
                    </div>
                    <div className='flex'>
                        <span className='text-[14px]'>
                            Mi experiencia en 5 años desarrollando aplicaciones, páginas web, bots automatizados, y tecnología decentralizada me ha llevado a evolucionar, aprender y mejorar como desarrollador.
                        </span>
                    </div>

                    <div className='flex flex-wrap mt-3'>
                        <div className='w-1/2 flex'>
                            <Animator animation={batch(Fade())}>
                                <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 205 }} className='overflow-hidden place-content-start'>
                                    <Link to={'/dotkyo_desarrollador_web'}>
                                        <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>DESARROLLADOR FULL-STACK <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                    </Link>
                                </motion.div>
                            </Animator>

                            <Animator animation={batch(Fade())}>
                                <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 115 }} className='overflow-hidden place-content-start ml-6'>
                                    <Link to={'/dotkyo_portafolio_web_developer'}>
                                        <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>PORTAFOLIO <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                    </Link>
                                </motion.div>
                            </Animator>
                        </div>

                        <div className='flex place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'43px'} heigth='auto' version='dotkyo' size='lg' color={"color"} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DotKyo
