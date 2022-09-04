import React, { useEffect, useState } from 'react'; import './BodyHome.css'
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeOut, batch, Move, MoveOut } from 'react-scroll-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';

import Introduction from '../../Components/HomeScroll/Introduction';

interface BodyProps { }

const Body: React.FC<BodyProps> = ({ }) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <motion.div className='container-bg' transition={{ duration: 2.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ScrollContainer>
                <ScrollPage page={0}>
                    <div style={{ transform: `translateY(${offsetY * 0.1})px` }} className='image-bg h-full w-full absolute opacity-[7%]'> <LazyLoadImage className='h-full w-full object-cover' loading="lazy" width={"100%"} height={"100%"} src={'https://ik.imagekit.io/kyonax/ImagenSet_Photos_1_JKfZTuMx_.png'} alt={`Image Kyonax Page`} /></div>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                        <div  style={{ transform: `translateY(${offsetY * 2.8})px` }} className='z-1 relative h-screen w-full grid place-content-center'>
                            <Introduction />
                        </div>
                    </Animator>
                </ScrollPage>

                <ScrollPage page={1}>
                    <Animator animation={batch(Fade(), MoveOut(0, -200))}>
                        <div className='h-screen w-full grid place-content-center'>
                            <Introduction /> <span className='ml-6 text-white'>Dot Kyo</span>
                        </div>
                    </Animator>
                </ScrollPage>

                <ScrollPage page={2}>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                        <div className='h-screen w-full grid place-content-center'>
                            <Introduction /> <span className='ml-6 text-white'>Kyonax Content Creator</span>
                        </div>
                    </Animator>
                </ScrollPage>

                <ScrollPage page={3}>
                    <Animator animation={batch(Fade(), MoveOut(0, -200))}>
                        <div className='h-screen w-full grid place-content-center'>
                            <Introduction /> <span className='ml-6 text-white'>KyoNFT</span>
                        </div>
                    </Animator>
                </ScrollPage>

                <ScrollPage page={4}>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                        <div className='h-screen w-full grid place-content-center'>
                            <Introduction /> <span className='ml-6 text-white'>Kyonax Content Creator</span>
                        </div>
                    </Animator>
                </ScrollPage>

            </ScrollContainer>
        </motion.div>
    )
}

export default Body
