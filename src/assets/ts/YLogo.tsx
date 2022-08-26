import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps { width: any, heigth: any }

const Logo: React.FC<LogoProps> = ({ width, heigth }) => {
    const PNG = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/Y_1st_g0xlxGC0e.png`,
    PNG_DARK = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/Y_1st_dark_jYYQJ7uoh.png`;

    return (
        <div className={`w-${width} h-${heigth} grid place-items-center`}>
            <div className='invisible lg:visible transition-all ease-in hover:ease-out hover:delay-50 delay-50 absolute opacity-50 hover:opacity-0 hover:cursor-pointer'><LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG_DARK} alt={'Y Logo Dark - Kyonax Version'} /></div>
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG} alt={'K Logo - Kyonax Version'} />
        </div>
    )
}

export default Logo
