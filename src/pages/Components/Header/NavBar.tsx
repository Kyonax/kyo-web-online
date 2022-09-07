import React, { useEffect, useState } from 'react'; import { Link } from 'react-router-dom';
import KyonaxLogo from '../../../assets/ts/KyonaxLogo'; import './NavBar.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { FaBars, FaTimes, FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa'
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

{/** Important Functions */ }

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

{/** Initialize Constant Variables */ }
const data: { [index: string]: any } = {
    acerca_de: { height: '125px', title: <span className='flex'>Acerca De <div className='ml-1 mt-[.1rem]'><IoCaretForwardOutline /></div> </span>, description: <span className='tracking-tighter'>¿Quien o Qué es Kyonax? Conoce a fondo la historia, y misión de la marca.</span> },
    dependencias: { height: '175px', title: <span className='flex'>Dependencias <div className='ml-1 mt-[.1rem]'><IoCaretForwardOutline /></div> </span>, description: <span className='tracking-tighter'>Kyonax se compone de tres principales dependencias con diferentes enfoques y objetivos, adentrate para saber más! <p className='mt-2 md:mt-1 text-end text-[#ff007b]'>Muy Pronto (TBA)...</p></span> },
    universo: { height: '150px', title: <span className='flex'>Universo <div className='ml-1 mt-[.1rem]'><IoCaretForwardOutline /></div> </span>, description: <span className='tracking-tighter'>Explora y Experimenta la Tecnología Digital por medio del Universo Kyonax.<p className='mt-2 md:mt-1 text-end text-[#ff007b]'>Muy Pronto (TBA)...</p></span> }
}

const navigator: { [index: string]: any } = {
    dotkyo: { version: "dotkyo", size_logo: { width: "70%", height: "100" }, size_type: "lg", color_logo: "white", image: ["https://ik.imagekit.io/kyonax/BannersWeb_DesarrolladorWeb_fnv2DYQtK.png"] },
    kyonax: { version: "kyonax", size_logo: { width: "70%", height: "100" }, size_type: "md", color_logo: "white", image: ["https://ik.imagekit.io/kyonax/BannersWeb_Kyonax_pbZjwBJKs.png"] },
    kyonft: { version: "kyonft", size_logo: { width: "0", height: "0" }, size_type: "lg", color_logo: "white", image: ["https://ik.imagekit.io/kyonax/BannersWeb_KyoNFT__QniT59GYe.png"] },
    rottenville: { version: "dotkyo", size_logo: { width: "0px", height: "0" }, size_type: "lg", color_logo: "white", image: ["https://ik.imagekit.io/kyonax/BannersWeb_RottenVille_hkai99qec.png"] },
    therottensdao: { version: "dotkyo", size_logo: { width: "0px", height: "0" }, size_type: "lg", color_logo: "white", image: ["https://ik.imagekit.io/kyonax/BannersWeb_TheRottensDAO_nAcJOYJhj.png"] }
}

interface NavBarProps { }

const NavBar: React.FC<NavBarProps> = ({ }) => {
    {/** Initialize Variables */ }
    let [color_logo, set_color_logo] = useState(`white`), [animation, set_animation] = useState(`transition-all ease-in-out delay-50 hover:transition-all hover:ease-in-out hover:delay-50`),
        [style_arrow_nav, set_style_arrow_nav] = useState(`text-white`), [title, set_title] = useState("Not Found"), [description, set_description] = useState("Not Found"),
        [animation_variant_height, set_animation_variant_height] = useState("130px");

    let [navigator_dependencie, set_navigator_dependencie] = useState("dotkyo");

    const [windowSize, setWindowSize] = useState(getWindowSize());
    {/** Function Hamburger */ }
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const [hover_display, set_hover_display] = useState(false), [hover_display_navigator, set_hover_display_navigator] = useState(false);
    const handleHover = (type: string) => {
        set_hover_display(true);
        set_title(data[type].title);
        set_description(data[type].description);
        set_animation_variant_height(data[type].height);
    }
    const handleLeave = () => set_hover_display(false);
    const handleNavigatorClick = () => set_hover_display_navigator(!hover_display_navigator);
    {/** Animation Variants */ }
    const variant_modal_animation = {
        display: {
            height: animation_variant_height
        },
        hide: {
            height: '0px'
        }
    }

    const variant_navigator_animation = {
        display: {
            height: (windowSize.innerWidth >= 768) ? '290px' : (windowSize.innerWidth >= 640 && windowSize.innerWidth < 768) ? '480px' : windowSize.innerHeight + 'px'
        },
        hide: {
            height: '0px'
        }
    }
    {/** Functions Deployable */ }
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    return (
        <motion.div className='fixed w-full place-content-center' transition={{ duration: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Mobile Menu */}
            <ul className={!nav ? 'hidden' : 'md:hidden absolute top-[0px] left-0 w-full h-screen flex flex-col justify-center items-center font-thin text-sm z-40'}>
                <motion.div animate={nav === true ? 'display' : 'hide'} variants={variant_navigator_animation} className='absolute top-[0px] left-0 bg-[#080808] bg-opacity-95 w-full grid place-items-center'>
                    <div className='w-full grid place-items-center'>
                        <React.Fragment>
                            <li className='py-3 text-1xl'><span className={`${animation} text-white p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#2e2e2e] hover:text-[#ff7c01] hover:cursor-pointer`}><Link to='/acerca_de'>Acerca de</Link></span></li>
                            <li className='py-3 text-1xl'><span className={`${animation} text-white p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#513d4f] hover:text-[#fe0f7a] hover:cursor-not-allowed before:content-['Dependencias'] hover:before:content-['Pronto...']`}></span></li>
                            <li className='py-3 text-1xl'><span className={`${animation} text-white p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#513d4f] hover:text-[#fe0f7a] hover:cursor-not-allowed before:content-['Universo'] hover:before:content-['Pronto...']`}></span></li>

                            <div className='mt-6 col-span-1 flex place-content-end text-white text-[12px]'>
                                <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://www.linkedin.com/in/kyonax/'><FaLinkedin /></a></div>
                                <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://github.com/Kyonax'><FaGithub /></a></div>
                                <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://twitter.com/kyonax_on'><FaTwitter /></a></div>
                            </div>
                        </React.Fragment>
                    </div>
                </motion.div>
            </ul>


            <div className='relative z-40 flex place-content-center pt-4 pb-4 pr-6 pl-6'>
                <div className='max-w-[2500px] grid grid-cols-10 pt-5 pb-5'>
                    <div className='col-span-2 md:col-span-1 flex items-start'>
                        <div className={`${animation} flex flex-wrap hover:cursor-pointer text-[12px] text-white`} onClick={() => handleNavigatorClick()} onMouseLeave={() => { set_color_logo(`white`); set_style_arrow_nav(`text-white`) }} onMouseOver={() => { set_color_logo(`color_dotkyo`); set_style_arrow_nav('text-[#ff7c01]'); }}>
                            <div className='w-1/2 flex place-content-center'><KyonaxLogo width={'33px'} heigth='auto' version='kyonax' size='md' color={color_logo} /></div>
                            <div className={`${style_arrow_nav} w-1/2 flex pl-2 p-1`}><IoCaretDownOutline /></div>
                        </div>
                    </div>
                    <div className='col-span-2'></div>
                    <div className='hidden col-span-4 md:flex md:flex-wrap text-center text-white text-[12px]'>
                        <React.Fragment>
                            <div className='w-1/3'><span onMouseOver={() => handleHover("acerca_de")} onMouseLeave={() => handleLeave()} className={`${animation} p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#2e2e2e] hover:text-[#ff7c01] hover:cursor-pointer`}><Link to='/acerca_de'>Acerca de</Link></span></div>
                            <div className='w-1/3'><span onMouseOver={() => handleHover("dependencias")} onMouseLeave={() => handleLeave()} className={`${animation} p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#513d4f] hover:text-[#fe0f7a] hover:cursor-not-allowed before:content-['Dependencias'] hover:before:content-['Pronto...']`}></span></div>
                            <div className='w-1/3'><span onMouseOver={() => handleHover("universo")} onMouseLeave={() => handleLeave()} className={`${animation} p-1 pr-3 pl-3 rounded-sm bg-[#1c1c1c] hover:bg-[#513d4f] hover:text-[#fe0f7a] hover:cursor-not-allowed before:content-['Universo'] hover:before:content-['Pronto...']`}></span></div>
                        </React.Fragment>
                    </div>

                    <div className='col-span-2'></div>
                    <div className='hidden ml-9 col-span-1 gap-3 md:flex place-content-end text-white text-[12px]'>
                        <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://www.linkedin.com/in/kyonax/'><FaLinkedin /></a></div>
                        <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://github.com/Kyonax'><FaGithub /></a></div>
                        <div className={`${animation} p-1 hover:cursor-pointer hover:text-[#ff7c01]`}><a target={`_blank`} href='https://twitter.com/kyonax_on'><FaTwitter /></a></div>
                    </div>

                    <div className='flex md:hidden col-span-3'></div>
                    <div className='flex md:hidden col-span-1'>
                        <div onClick={handleClick} className={`${animation} ml-7 sm:ml-14 flex md:hidden col-span-1 hover:cursor-pointer hover:text-[#ff7c01] text-white`}>
                            {/* Hamburger */}
                            {!nav ? <FaBars /> : <FaTimes />}
                        </div>
                    </div>
                </div>
            </div>

            <div className={!hover_display ? 'hidden' : `z-40 absolute w-full flex place-content-center`}>
                <motion.div animate={hover_display === true ? 'display' : 'hide'} variants={variant_modal_animation} className={`w-[40%] overflow-hidden max-w-[400px] min-w-[350px] p-6 font-medium text-start text-black bg-[#f9f9f9] center-0 justify-center rounded-sm mt-2`}>
                    <div><span className={`${animation} text-[14px]`}>{description}</span></div>
                    <div className='w-full h-[.7rem]'></div>
                    <h1 className={`${animation} text-end text-[.75rem] text-title`}>{title}</h1>
                </motion.div>
            </div>

            <div className={!hover_display_navigator ? 'hidden' : `z-40 fixed top-0 w-full flex place-content-center`}>
                <React.Fragment>
                    <motion.div animate={hover_display_navigator === true ? 'display' : 'hide'} variants={variant_navigator_animation} className={`w-full z-40 overflow-hidden p-8 font-medium text-start text-black bg-[#f9f9f9] center-0 justify-center`}>
                        <motion.div transition={{ duration: 1.5 }} animate={hover_display_navigator === true ? { opacity: ["0", "100%"] } : ''} className='flex flex-wrap'>
                            <div className='flex w-1/2 md:w-1/3 lg:w-1/5 content-start'><KyonaxLogo width={'125px'} heigth='auto' version='kyonax' size='lg' color={"black"} /></div>
                            <div className='hidden md:flex w-1/3 lg:w-3/5'></div>
                            <div className='flex w-1/2 md:w-1/3 lg:w-1/5 place-content-end'>
                                <div className='flex mt-1'><span className='text-[12px] p-1 pr-2 pl-2 hover:bg-[#ebebeb] rounded-sm'><Link to='/'>INICIO</Link></span></div>
                                <div className='mt-1 ml-2 text-[12px]'><div onClick={() => handleNavigatorClick()} className='bg-[#ebebeb] p-2 rounded-sm hover:cursor-pointer hover:text-[#ff7c01]'><FaTimes /></div></div>
                            </div>
                            <div className='w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 grid-rows-3 sm:grid-rows-2 text-[11px] lg:text-[14px]'>
                                <div className='col-span-1'>
                                    <ul>
                                        <li className='text-center bg-[#ebebeb] font-semibold rounded-sm p-1 m-1'><span>DOT KYO</span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("dotkyo")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><Link to='/dotkyo_desarrollador_web'>DESARROLLADOR FULL-STACK</Link></span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("dotkyo")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><Link to='/dotkyo_portafolio_web_developer'>PORTAFOLIO WEB-DEVELOPER</Link></span></li>
                                        <li className='text-center bg-[#ebebeb] font-semibold rounded-sm p-1 m-1'><span>KYONAX</span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("kyonax")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><Link to='/kyonax_editor_multimedia'>EDITOR MULTIMEDIA</Link></span></li>
                                    </ul>
                                </div>
                                <div className='col-span-1'>
                                    <ul>
                                        <li className='text-center bg-[#ebebeb] font-semibold rounded-sm p-1 m-1'><span>KYO NFT</span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("kyonft")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><Link to='/kyonft_desarrollador_web3'>DESARROLLADOR WEB 3.0</Link></span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("kyonft")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><Link to='/kyonft_creador_de_contenido'>NFTs &amp; CREACIÓN DE CONTENIDO</Link></span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("rottenville")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><a target={`_blank`} href='https://rottenville.io'>PROYECTO ROTTEN VILLE</a></span></li>
                                        <li onMouseOver={() => set_navigator_dependencie("therottensdao")} className='text-center hover:bg-[#ebebeb] p-1 m-1'><span><a target={`_blank`} href="https://therottensdao.com">THE ROTTENS DAO</a></span></li>
                                    </ul>
                                </div>
                                <div className='col-span-1 sm:col-span-2 row-span-4 sm:row-span-3 md:col-span-1 md:row-span-1 p-1'>
                                    <div className='relative rounded-sm w-full h-full resize-image'>

                                        <div className='flex rounded-md absolute w-full h-full place-content-start items-center'>
                                            <div className=''><KyonaxLogo width={navigator[navigator_dependencie].size_logo.width} heigth={navigator[navigator_dependencie].size_logo.height} version={navigator[navigator_dependencie].version} size={navigator[navigator_dependencie].size_type} color={navigator[navigator_dependencie].color_logo} /></div>
                                        </div>

                                        <div className='h-full w-full'>
                                            <LazyLoadImage className='rounded-md' loading="lazy" width={"100%"} height={"100%"} src={navigator[navigator_dependencie].image[0]} alt={`Image Kyonax Page`} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div onClick={() => handleNavigatorClick()} className='z-30 absolute w-full h-screen bg-black opacity-70'></div>
                </React.Fragment>
            </div>
        </motion.div>
    )
}

export default NavBar
