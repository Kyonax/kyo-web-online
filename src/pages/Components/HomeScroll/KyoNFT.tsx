import React, { useEffect } from 'react';
import TypeWriter from "typewriter-effect"; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeIn, FadeOut, batch, Move, MoveOut, MoveIn } from 'react-scroll-motion';
import { motion } from 'framer-motion';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import KyonaxLogo from '../../../assets/ts/KyonaxLogo';


interface KyoNFTProps {

}

const KyoNFT: React.FC<KyoNFTProps> = ({ }) => {

    return (
        <div className='h-screen grid grid-cols-1 md:grid-cols-4 place-content-end mb-[22rem] text-[#f9f9f9]'>

            <div className='grid p-4 col-span-3 place-content-center text-start bg-[#0f0f0f]'>
                <div className='grid'>
                    <div className='text-title grid text-2xl md:text-5xl'>
                        <span>EL FUTURO DE LA</span>
                        <span className='text-[1.5rem] md:text-[4rem] mt-[-.25rem] md:mt-[-.5rem]'>DECENTRALIZACION</span>
                    </div>
                    <div className='flex'>
                        <span className='text-[11px] md:text-[14px]'>
                            Las nuevas herramientas web3.0 abren nuevos mundos para el universo digital, la decentralización es uno de ellos, Kyonax cómo desarrollador a cultivado experiencia en este ecosistema y está preparado para realizar o ayudar a cualquier tipo de proyecto web3.0.
                        </span>
                    </div>

                    <div className='flex flex-wrap mt-3'>
                        <div className='w-2/3 md:w-1/2 flex'>
                            <Animator animation={batch(Fade())}>
                                <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 205 }} className='overflow-hidden place-content-start'>
                                    <Link to={''}>
                                        <span className={`hover:cursor-not-allowed before:content-['DESARROLLADOR_WEB_3.0'] hover:before:content-['Pronto...'] text-[12px] flex p-1 hover:text-[#a71ce5] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]`}><div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                    </Link>
                                </motion.div>
                            </Animator>

                            <Animator animation={batch(Fade())}>
                                <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 125 }} className='overflow-hidden place-content-start ml-6'>
                                    <a target={`_blank`} href="https://rottenville.io">
                                        <span className={`before:content-['ROTTEN_VILLE'] hover:before:content-['ROTTEN VILLE'] text-[12px] flex p-1 hover:text-[#a71ce5] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[320px]`}><div className='hidden md:flex ml-2 mt-[.2rem]'><IoCaretForwardOutline /></div></span>
                                    </a>
                                </motion.div>
                            </Animator>
                        </div>

                        <div className='hidden md:flex place-content-end pr-6 w-1/2'>
                            <KyonaxLogo width={'43px'} heigth='auto' version='kyonft' size='lg' color={"color"} />
                        </div>

                        <div className='flex md:hidden place-content-end pr-6 w-1/3'>
                            <KyonaxLogo width={'35px'} heigth='auto' version='kyonft' size='lg' color={"color"} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default KyoNFT
