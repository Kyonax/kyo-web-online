import React, { useEffect } from 'react';
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
        <div className='h-screen grid grid-cols-1 md:grid-cols-4 place-content-end mb-[22rem] text-[#f9f9f9]'>

            <div className='grid p-4 col-span-3 place-content-center text-start bg-[#0f0f0f]'>
                <div className='grid'>
                    <div className='text-title grid text-2xl md:text-5xl'>
                        <span>LA MAGIA DEL</span>
                        <span className='text-[2.3rem] md:text-[4rem] mt-[-.25rem] md:mt-[-.5rem]'>DESARROLLO</span>
                    </div>
                    <div className='flex'>
                        <span className='text-[11px] md:text-[14px]'>
                            Mi experiencia en 5 años desarrollando aplicaciones, páginas web, bots automatizados, y tecnología decentralizada me ha llevado a evolucionar, aprender y mejorar como desarrollador.
                        </span>
                    </div>

                    <div className='flex flex-wrap mt-3'>
                        <div className='w-2/3 md:w-1/2 flex'>

                            <div className='hidden md:flex'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 205 }} className='overflow-hidden place-content-start'>
                                        <Link to={'/dotkyo_desarrollador_web'}>
                                            <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>DESARROLLADOR FULL-STACK <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                            <div className='flex md:hidden'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 155 }} className='overflow-hidden place-content-start'>
                                        <Link to={'/dotkyo_desarrollador_web'}>
                                            <span className='text-[9px] flex p-2 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>DESARROLLADOR FULL-STACK <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                            <div className='hidden md:flex'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 115 }} className='overflow-hidden place-content-start ml-6'>
                                        <Link to={'/dotkyo_portafolio_web_developer'}>
                                            <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>PORTAFOLIO <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                            <div className='flex md:hidden ml-3 bg-black'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 80 }} className='overflow-hidden place-content-start ml-0'>
                                        <Link to={'/dotkyo_portafolio_web_developer'}>
                                            <span className='text-[9px] flex p-2 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-full'>PORTAFOLIO <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                        </div>

                        <div className='hidden md:flex place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'43px'} heigth='auto' version='dotkyo' size='lg' color={"color"} />
                        </div>

                        <div className='flex md:hidden place-content-end pr-6 w-1/3'>
                            <KyonaxLogo width={'35px'} heigth='auto' version='dotkyo' size='lg' color={"color"} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DotKyo
