import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps { width: any, heigth: any }

const Logo: React.FC<LogoProps> = ({ width, heigth }) => {
    const PNG = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/O_1st_uMm1WXqrd.png`,
        PNG_DARK = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/O_1st_dark_GFgTDmSx_.png`;

    return (
        <div className={`w-${width} h-${heigth} grid place-items-center`}>
            <div className='invisible lg:visible transition-all ease-in hover:ease-out hover:delay-50 delay-50 absolute opacity-50 hover:opacity-0 hover:cursor-pointer'><LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG_DARK} alt={'O Logo Dark - KyoNFT Version'} /></div>
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG} alt={'O Logo - KyoNFT Version'} />
        </div>
    )
}

export default Logo
