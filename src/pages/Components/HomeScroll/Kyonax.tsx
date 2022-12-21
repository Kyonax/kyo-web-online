import React, { useEffect } from 'react';
import TypeWriter from "typewriter-effect"; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeIn, FadeOut, batch, Move, MoveOut, MoveIn } from 'react-scroll-motion';
import { motion } from 'framer-motion';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import KyonaxLogo from '../../../assets/ts/KyonaxLogo';


interface KyonaxProps {

}

const Kyonax: React.FC<KyonaxProps> = ({ }) => {

    return (
        <div className='h-screen grid grid-cols-1 md:grid-cols-4 place-content-end mb-[22rem] text-[#f9f9f9]'>

            <div className='grid p-4 col-span-3 place-content-center text-start bg-[#0f0f0f]'>
                <div className='grid'>
                    <div className='text-title grid text-2xl md:text-5xl'>
                        <span>EL PODER</span>
                        <span className='text-[2.3rem] md:text-[4rem] mt-[-.25rem] md:mt-[-.5rem]'>DE LAS REDES</span>
                    </div>
                    <div className='flex'>
                        <span className='text-[11px] md:text-[14px]'>
                            La influencia de las redes sociales nos brinda herramientas imprescindibles para cualquier tipo de negocio/empresa, Kyonax se enfoca de solucionar y desarrollar estrategías exitosas para cualquier proyecto digital.
                        </span>
                    </div>

                    <div className='flex flex-wrap mt-3'>
                        <div className='w-1/2 flex'>

                            <div className='hidden md:flex'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 170 }} className='overflow-hidden place-content-start'>
                                        <Link to={'/kyonax_publicidad_digital'}>
                                            <span className='text-[12px] flex p-1 hover:text-[#fe0f7a] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>PUBLICIDAD DIGITAL <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                            <div className='flex md:hidden'>
                                <Animator animation={batch(Fade())}>
                                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 120 }} className='overflow-hidden place-content-start'>
                                        <Link to={'/kyonax_publicidad_digital'}>
                                            <span className='text-[9px] flex p-2 hover:text-[#fe0f7a] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]'>PUBLICIDAD DIGITAL <div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                        </Link>
                                    </motion.div>
                                </Animator>
                            </div>

                        </div>


                        <div className='hidden md:flex place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'35px'} heigth='auto' version='kyonax' size='md' color={"color"} />
                        </div>

                        <div className='flex md:hidden place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'30px'} heigth='auto' version='kyonax' size='md' color={"color"} />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Kyonax
