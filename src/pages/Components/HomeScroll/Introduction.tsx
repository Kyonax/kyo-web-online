import React, { useEffect } from 'react'; import './Introduction.css';
import TypeWriter from "typewriter-effect"; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeIn, FadeOut, batch, Move, MoveOut, MoveIn } from 'react-scroll-motion';
import { motion } from 'framer-motion';

import KyonaxLogo from '../../../assets/ts/KyonaxLogo';

interface IntroductionProps {

}

const Introduction: React.FC<IntroductionProps> = ({ }) => {

    return (
        <div className='grid grid-cols-1 p-3 text-[#f9f9f9]'>
            <div className='grid place-content-center text-center'>
                <Animator animation={batch(Fade(), MoveOut(0, -425))}>
                    <motion.div transition={{ duration: 1.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex place-content-center mb-[-40px] mt-[-65px]'><KyonaxLogo width={'100px'} heigth='auto' version='kyonax' size='lg' color={"white"} /></motion.div>
                </Animator>
                <Animator animation={batch(Fade(), MoveOut(0, -300))}>
                    <span className='flex place-content-center text-title text-7xl'>
                        <Animator animation={batch(Fade(), MoveOut(0, -100))}><motion.p transition={{ duration: 1.2 }} initial={{ x: -50 }} animate={{ x: 0 }}>E</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -60))}><motion.p transition={{ duration: 1.2 }} initial={{ y: 35 }} animate={{ y: 0 }} className='ml-1'>X</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -100))}><motion.p transition={{ duration: 1.2 }} initial={{ y: -40 }} animate={{ y: 0 }} className='ml-1'>P</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -80))}><motion.p transition={{ duration: 1.2 }} initial={{ y: 20 }} animate={{ y: 0 }} className='ml-1'>E</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -120))}><motion.p transition={{ duration: 1.2 }} initial={{ y: -20 }} animate={{ y: 0 }} className='ml-1'>R</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -80))}><motion.p transition={{ duration: 1.2 }} initial={{ y: 30 }} animate={{ y: 0 }} className='ml-1'>I</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -100))}><motion.p transition={{ duration: 1.2 }} initial={{ y: -20 }} animate={{ y: 0 }} className='ml-1'>E</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -80))}><motion.p transition={{ duration: 1.2 }} initial={{ y: 30 }} animate={{ y: 0 }} className='ml-1'>N</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -60))}><motion.p transition={{ duration: 1.2 }} initial={{ y: -20 }} animate={{ y: 0 }} className='ml-1'>C</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -80))}><motion.p transition={{ duration: 1.2 }} initial={{ y: 20 }} animate={{ y: 0 }} className='ml-1'>I</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -100))}><motion.p transition={{ duration: 1.2 }} initial={{ y: -40 }} animate={{ y: 0 }} className='ml-1'>A</motion.p></Animator>
                        <Animator animation={batch(Fade(), MoveOut(0, -120))}><motion.p transition={{ duration: 1.2 }} initial={{ x: 50 }} animate={{ x: 0 }} className='ml-1'>S</motion.p></Animator>
                    </span>
                </Animator>

                <span className='w-full place-content-center mt-[-1rem] text-title tracking-wide text-8xl flex'>
                    <Animator animation={batch(Fade(), Move(-200, 0))}>
                        <motion.p className='flex' transition={{ duration: 1.2 }} initial={{ x: -150 }} animate={{ x: 0 }}>
                            <Animator animation={batch(Fade(), Move(-190, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: -150 }} animate={{ x: 0 }}>D</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(-160, 0))}> <motion.p transition={{ duration: 1.2 }} initial={{ x: -120 }} animate={{ x: 0 }} className='ml-1'>I</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(-130, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: -90 }} animate={{ x: 0 }} className='ml-1'>G</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(-100, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: -60 }} animate={{ x: 0 }} className='ml-1'>I</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(-70, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: -30 }} animate={{ x: 0 }} className='ml-1'>T</motion.p></Animator>
                        </motion.p>
                    </Animator>
                    <Animator animation={batch(Fade(), Move(200, 0))}>                        
                        <motion.p transition={{ duration: 1.2 }} initial={{ x: 120 }} animate={{ x: 0 }} className='flex'>
                            <Animator animation={batch(Fade(), Move(70, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: 30 }} animate={{ x: 0 }}>A</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(100, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: 60 }} animate={{ x: 0 }} className='ml-1'>L</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(140, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: 100 }} animate={{ x: 0 }} className='ml-1'>E</motion.p></Animator>
                            <Animator animation={batch(Fade(), Move(160, 0))}><motion.p transition={{ duration: 1.2 }} initial={{ x: 120 }} animate={{ x: 0 }} className='ml-1'>S</motion.p></Animator>
                        </motion.p>
                    </Animator>
                </span>

                <Animator animation={Fade()}>
                    <div className='w-full flex place-content-center'>
                        <motion.span className='color-span font-semibold tracking-normal flex place-content-center text-[14px]'>
                            <div >
                                <TypeWriter onInit={(typewriter) => {
                                    typewriter.changeDelay(12).typeString("Inspira, Crea, y Conecta a través de mi Trabajo").start();
                                }} />
                            </div>
                        </motion.span>
                    </div>
                </Animator>
                <Animator animation={batch(Fade(), Move(-250, 0))}>
                    <motion.div transition={{ duration: 1.5 }} initial={{ width: 0 }} animate={{ width: 110 }} className='overflow-hidden place-content-start mt-6'>
                        <Link to={'/acerca_de'}>
                            <span className='text-[12px] flex p-1 hover:text-[#ff7c01] bg-[#1c1c1c] hover:bg-[#2e2e2e] pr-3 pl-4 rounded-sm w-[120px]'>ACERCA DE <div className='hidden md:flex ml-2 mt-[.3rem]'><IoCaretForwardOutline /></div></span>
                        </Link>
                    </motion.div>
                </Animator>
            </div>
        </div >
    )
}

export default Introduction
