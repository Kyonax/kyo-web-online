import React, { useRef, useEffect, useState } from 'react'; import './BodyHome.css'
import { Animator, ScrollContainer, ScrollPage, Sticky, Fade, FadeOut, batch, Move, MoveOut, FadeIn, Zoom, ZoomOut } from 'react-scroll-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';

import useWindowSize from '../../../hooks/useWindowSize';
import useWindowScroll from '../../../hooks/useWindowScroll';

import Introduction from '../../Components/HomeScroll/Introduction';
import DotKyo from '../../Components/HomeScroll/DotKyo';

{/** Important Functions */ }

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

interface BodyProps { }

const Body: React.FC<BodyProps> = ({ }) => {
    {/** Page Effects */ }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    {/** Image and Backgrounds */ }
    const background_image = {
        image: (windowSize.innerWidth >= 1324) ? 'https://ik.imagekit.io/kyonax/ImagenSet_Photos_2_Q-F1x-upg.png' :
            (windowSize.innerWidth >= 768 && windowSize.innerWidth < 1324) ? 'https://ik.imagekit.io/kyonax/ImagenSet_Photos_3_KUs0ioGG3.png' :
                'https://ik.imagekit.io/kyonax/ImagenSet_Photos_sF-XcYuI4.png'
    }
    {/** Functions Deployable */ }
    useEffect(() => {
        function handleWindowResize() { setWindowSize(getWindowSize()); }
        window.addEventListener('resize', handleWindowResize);

        return () => { window.removeEventListener('resize', handleWindowResize); };
    }, [])

    {/** Skew Effect */ }
    const size = useWindowSize(), scroll = useWindowScroll();
    {/** REF */ }
    const scrollContainer = useRef<HTMLDivElement>(null),
        scrollContainer_1 = useRef<HTMLDivElement>(null),
        scrollContainer_2 = useRef<HTMLDivElement>(null);

    const [skewConfigs, setSkewConfigs] = useState({
        ease: .1, current: 0, previous: 0, rounded: 0
    })

    const skewScrolling = () => {
        console.log(scroll.scrollY)
        skewConfigs.current = scroll.scrollY;
        skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
        skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;
    }

    const difference = skewConfigs.current - skewConfigs.rounded,
        acceleration = difference / size.width, velocity = +acceleration, skew = velocity * 20.5;

    useEffect(() => {
        function updateAnimation() {
            if (scrollContainer.current) {
                scrollContainer.current.style.transform = `skewY(${skew}deg)`;
            }

            if (scrollContainer_1.current) {
                scrollContainer_1.current.style.transform = `skewY(${skew}deg)`;
            }

            if (scrollContainer_2.current) {
                scrollContainer_2.current.style.transform = `skewY(${skew}deg)`;
            }
        }

        window.addEventListener('scroll', updateAnimation);
        updateAnimation()

        return () => window.removeEventListener('scroll', updateAnimation);
    }, [scroll])

    useEffect(() => {
        if (scrollContainer.current) { document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px` }
        if (scrollContainer_1.current) { document.body.style.height = `${scrollContainer_1.current.getBoundingClientRect().height}px` }
        if (scrollContainer_2.current) { document.body.style.height = `${scrollContainer_2.current.getBoundingClientRect().height}px` }
    }, [size.height])

    useEffect(() => {
        function updateAnimation() {
            requestAnimationFrame(() => skewScrolling());
        }

        window.addEventListener('scroll', updateAnimation); updateAnimation();
        return () => window.removeEventListener('scroll', updateAnimation);
    }, [scroll])

    requestAnimationFrame(() => skewScrolling())

    return (
        <motion.div className='container-bg' transition={{ duration: 2.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ScrollContainer snap='mandatory'>
                <ScrollPage page={0}>

                    <div className='image-bg h-full w-full absolute opacity-[6%]'>
                        <LazyLoadImage className='h-full w-full object-cover' loading="lazy" width={"100%"} height={"100%"} src={background_image.image} alt={`Image Kyonax Page`} />
                    </div>

                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                        <div className='z-1 relative h-screen w-full grid place-content-center'>
                            <Introduction />
                        </div>
                    </Animator>

                </ScrollPage>

                <ScrollPage page={1}>
                    <div className='h-screen w-full flex place-content-center'>
                        <Animator animation={batch(Fade())}>
                            <div className='relative max-w-[1224px]'>
                                <div className='h-full absolute right-0 opacity-[100%]'>
                                    <LazyLoadImage className='h-full object-contain' loading="lazy" width={"100%"} height={"100%"} src={'https://ik.imagekit.io/kyonax/IMAGE_V_1_XljIxh21i.png'} alt={`Image Dot Kyo Page`} />
                                </div>

                                <Animator animation={batch(MoveOut(0, -700))}>
                                    <div ref={scrollContainer} className='z-1 relative h-screen w-full grid place-content-center'>
                                        <DotKyo />
                                    </div>
                                </Animator>
                            </div>
                        </Animator>
                    </div>
                </ScrollPage>


                <ScrollPage page={2}>
                    <div className='h-screen w-full flex place-content-center'>
                        <div className='relative max-w-[1224px]'>
                            <div className='h-full absolute right-0 opacity-[100%]'>
                                <LazyLoadImage className='h-full object-contain' loading="lazy" width={"100%"} height={"100%"} src={'https://ik.imagekit.io/kyonax/IMAGE_V_3_0E1TESBMr.png'} alt={`Image Dot Kyo Page`} />
                            </div>

                            <Animator animation={batch(MoveOut(0, -700))}>
                                <div ref={scrollContainer_1} className='z-1 relative h-screen w-full grid place-content-center'>
                                    <DotKyo />
                                </div>
                            </Animator>
                        </div>
                    </div>
                </ScrollPage>

                <ScrollPage page={3}>
                    <div className='h-screen w-full flex place-content-center'>
                        <div className='relative max-w-[1224px]'>
                            <div className='h-full absolute right-0 opacity-[100%]'>
                                <LazyLoadImage className='h-full object-contain' loading="lazy" width={"100%"} height={"100%"} src={'https://ik.imagekit.io/kyonax/IMAGE_V_2_QwZqBMGoO.png'} alt={`Image Dot Kyo Page`} />
                            </div>

                            <Animator animation={batch(MoveOut(0, -700))}>
                                <div ref={scrollContainer_2} className='z-1 relative h-screen w-full grid place-content-center'>
                                    <DotKyo />
                                </div>
                            </Animator>
                        </div>
                    </div>
                </ScrollPage>

            </ScrollContainer>
        </motion.div>
    )
}

export default Body
