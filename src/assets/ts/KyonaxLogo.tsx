
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps { width: any, heigth: any, version: string, size: string, color: string }

const Logo: React.FC<LogoProps> = ({ width, heigth, version, size, color }) => {

    let SVG: { [index: string]: any } = {
        kyonax: {
            lg: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_md_white_vtPg9UHbi.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_md_nGEZH_exx.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_md_ff007b_Gh7NJwlkG.svg`,
                color_dotkyo: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_md_ff7c01_FEY1n1nEu.svg`,
                color_kyonft: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_md_a819eb_86GYyTcTF.svg`
            },
            md: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_sm_white_rtyEwSwIy.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_sm_-e0VJA83S.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_sm_ff007b_PdACmGr9B.svg`,
                color_dotkyo: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_sm_ff7c01_cnXyO-c57.svg`,
                color_kyonft: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/LOGO_KYONAX_sm_a819eb_ZWXj_57wm.svg`
            }
        },
        dotkyo: {
            lg: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_lg_white_g1vE3aYV7.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_lg_iEdt-jnG1.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_lg_ff7c01_pC06IlyR3Q.svg`
            },
            md: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_sm_white_cfoNVI3TC.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_sm_2JlWzjdrA.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_sm_ff7c01_RmihPwGby.svg`
            },
            sm: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_xsm_white_3wX3H0bCr.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_xsm_stA_nM5d90.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_xsm_ff7c01_E-7iqK32su.svg`,
                color_dark: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/dotkyo_xsm_black_ff7c01_xhRjmDF-d.svg`
            }
        },
        kyonft: {
            lg: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/md_white_-yq7ZCuUQ.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/md_hKuwH7eJM.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/md_a819eb_y2FIwwl-3.svg`
            },
            md: {
                white: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/sm_white_iKpDcHneK.svg`,
                black: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/sm_zTjIeaH96.svg`,
                color: `https://ik.imagekit.io/kyonax/tr:h-${heigth}/svg/Kyonax_Logo/sm_a819eb_F1XrSm54b.svg`
            }
        }
    }

    return (
        <div className={`w-[${width}] h-[${heigth}] relative grid place-items-center`}>
            <LazyLoadImage loading="lazy" width={width} height={heigth} src={SVG[version][size][color]} alt={`${version} Logo - ${color} style `} />
        </div>
    )
}

export default Logo
