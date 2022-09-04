import React from 'react'; import { Link } from 'react-router-dom';
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <React.Fragment>
            <motion.div transition={{ duration: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className='font-thin text-[8px] md:text-[10px] fixed bottom-0 w-full h-[6rem] flex flex-wrap items-center text-white'>
                <div className='flex place-content-start lg:place-content-center pl-3 w-2/3 text-center lg:w-1/3 '>
                    <div className='text-start tracking-widest'>
                        <a href='https://twitter.com/kyonax_on' target="_blank"><p>HECHO CON ❤️ © 2022 KYONAX<br />DOT KYO DEVELOPMENT</p></a>
                    </div>
                </div>

                <div className='hidden md:flex lg:w-1/3'></div>

                <div className='flex place-content-end pr-3 lg:place-content-center w-1/3 text-right lg:w-1/3'>
                    <div className='text-[9px] md:text-[11px] rounded-sm pr-[.45rem] pt-3 pb-2 pl-[.45rem] md:pr-4 md:pl-4 md:pt-3 md:pb-2 bg-[#1c1c1c] hover:bg-[#2e2e2e]'>
                        <span className='flex hover:text-[#ff7c01]'><Link className='flex' to={'/contacto'}>TRABAJEMOS JUNTOS  <div className='hidden md:flex ml-2 mt-[.1rem]'><IoCaretForwardOutline /></div></Link></span>
                    </div>
                </div>
            </motion.div>
        </React.Fragment>
    )
}

export default Footer