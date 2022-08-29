import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps { width: any, heigth: any }

const Logo: React.FC<LogoProps> = ({ width, heigth }) => {
    const PNG = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/K_1st__wQRlqx4kq.png`,
        PNG_DARK = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/K_1st_dark__AUfhaV7Ai.png`;

    return (
        <div className={`w-${width} h-${heigth} relative grid place-items-center`}>
            <div className='invisible lg:visible transition-all ease-in hover:ease-out hover:delay-50 delay-50 absolute opacity-50 hover:opacity-0 hover:cursor-pointer'><LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG_DARK} alt={'K Logo Dark - DotKyo Version'} /></div>
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG} alt={'K Logo - DotKyo Version'} />
        </div>
    )
}

export default Logo
