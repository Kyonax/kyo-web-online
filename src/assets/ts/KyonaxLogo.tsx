
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps { width: any, heigth: any, version: any }

const Logo: React.FC<LogoProps> = ({ width, heigth, version }) => {
    const PNG = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/LOGO_KIONAX-13_White_IsA-13dh8.png`,
          PNG_BLACK = `https://ik.imagekit.io/kyonax/tr:h-${heigth}/LOGO_KIONAX-13_dn_qSAmcZ.png`;

    return (
        <div className={`w-${width} h-${heigth} relative grid place-items-center`}>
            {
                (version === "white") ?
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG} alt={'Kyonax Logo - Logo Version'} /> :
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={PNG_BLACK} alt={'Kyonax Logo - Logo Version Black'} />
            }
        </div>
    )
}

export default Logo
