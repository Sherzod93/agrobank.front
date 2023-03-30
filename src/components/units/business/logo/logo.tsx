import cs from 'classnames';
import React, { FC } from 'react';
import { Link } from '../../link/link';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { useAppSelector } from '../../../../services/store';
import logoStyles from './style.module.scss';

const logoClassname = 'logo';

const Logo: FC<WithClassNameComponentProps> = ({ className }) => {
    const { baseBackgroundColor } = useBaseBackgroundColor();
    const { content: { isMainPage = false, mainPageUrl = '/' } = {} } = useAppSelector((state) => state.pageContent);
    const logo = (
        <svg
            className={cs(
                logoStyles[logoClassname],
                logoStyles[`${logoClassname}_base-background-color_${baseBackgroundColor}`],
                className,
            )}
            height="43"
            viewBox="0 0 219 43"
            width="219"
        >
            <path
                className={logoStyles[`${logoClassname}__logo`]}
                d="M0 43h21.23L0 21.5V43ZM42.461 43V21.5L21.231 43h21.23ZM21.23 0l21.231 21.5V0h-21.23ZM0 0v21.5L21.23 0H0Z"
            />
            <path
                className={logoStyles[`${logoClassname}__title`]}
                d="M61.744 10.219v3.591h4.396l-7.493 18.465h5.494l1.649-4.553h9.341l1.699 4.553h5.645L73.533 10.22h-11.79Zm5.545 13.507 3.147-8.448 3.197 8.448h-6.344ZM96.112 18.312c-.75-1.265-2.448-2.63-5.096-2.63-4.146 0-7.393 2.984-7.393 8.195 0 5.11 3.247 8.094 7.393 8.094 2.498 0 4.097-1.214 4.896-2.378v1.468c0 2.984-2.348 3.996-4.746 3.996-2.298 0-4.246-.658-6.044-1.872v3.997c1.648 1.011 3.846 1.618 6.843 1.618 5.046 0 8.892-2.58 8.892-7.638V16.086h-4.745v2.226Zm-3.747 9.865c-2.248 0-3.746-1.72-3.746-4.3-.05-2.681 1.498-4.3 3.746-4.3 1.349 0 2.598.455 3.597 1.416v5.818c-1 .86-2.248 1.366-3.597 1.366ZM111.849 19.678l-.75-3.642h-7.443v3.39h3.297v12.798h4.996V22.31c.699-1.164 2.098-2.074 4.645-2.074.75 0 1.499.101 1.949.253v-4.503c-.3-.151-.85-.253-1.399-.253-3.147 0-4.896 1.923-5.295 3.946ZM129.082 15.682c-5.146 0-8.992 3.39-8.992 8.498 0 5.11 3.796 8.449 8.992 8.449 5.095 0 8.941-3.34 8.941-8.448 0-5.11-3.846-8.5-8.941-8.5Zm0 13c-2.398 0-3.997-1.87-3.997-4.502 0-2.68 1.599-4.552 3.997-4.552 2.347 0 3.946 1.871 3.946 4.552 0 2.631-1.599 4.503-3.946 4.503ZM150.263 15.681c-2.348 0-3.897 1.114-4.746 2.277V9.51h-4.996v22.765h4.746v-2.176c.799 1.265 2.448 2.58 4.996 2.58 4.146 0 7.393-3.136 7.393-8.448 0-5.413-3.247-8.55-7.393-8.55Zm-1.299 13.002c-1.299 0-2.498-.456-3.447-1.366v-6.324c.949-.91 2.148-1.366 3.447-1.366 2.298 0 3.746 1.771 3.746 4.553-.05 2.732-1.498 4.503-3.746 4.503ZM175.789 28.177v-6.172c0-3.895-2.947-6.323-7.742-6.323-2.948 0-5.096.657-6.694 1.618v3.946a10.192 10.192 0 0 1 5.844-1.871c2.198 0 3.797.86 3.797 3.035v.405c-.899-.253-2.198-.456-3.547-.456-3.896 0-7.443 1.568-7.443 5.16 0 2.934 2.598 5.06 6.044 5.06 2.748 0 4.197-.962 5.096-2.126.499 1.468 2.098 2.125 3.646 2.125 1.599 0 2.398-.354 2.948-.607v-2.934c-.2.05-.55.101-.8.101-.599.101-1.149-.202-1.149-.961Zm-8.192 1.062c-1.599 0-2.648-.759-2.648-1.872 0-1.466 1.649-1.972 3.148-1.972 1.099 0 2.048.151 2.847.404v1.923c-.849.96-1.898 1.517-3.347 1.517ZM191.525 15.682c-2.748 0-4.596 1.416-5.545 2.731l-.5-2.377h-7.443v3.39h3.297v12.798h4.996v-11.23c.699-.76 1.848-1.215 3.097-1.215 1.998 0 3.147 1.012 3.147 3.137v9.359h4.995V21.499c.05-3.794-2.547-5.817-6.044-5.817ZM218.95 32.224v-3.339h-2.298l-3.796-5.565 5.045-7.234h-4.995l-4.047 5.869h-2.198V9.51h-4.995v22.765h4.995v-6.729h2.248l4.396 6.729H219l-.05-.051Z"
            />
        </svg>
    );

    return isMainPage ? (
        logo
    ) : (
        <Link className={logoStyles[`${logoClassname}__link`]} to={mainPageUrl}>
            {logo}
        </Link>
    );
};

export { Logo };