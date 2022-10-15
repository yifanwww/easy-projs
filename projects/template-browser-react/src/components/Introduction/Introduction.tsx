import Assets from '@easy-pkg/assets';

import css from './Introduction.module.scss';

export const Introduction: React.FC = () => (
    <header className={css.introduction}>
        <img className={css.logo} src={Assets.logo} alt="logo" />
        <p>
            Edit <code>src/components/Introduction/Introduction.tsx</code> and save to reload.
        </p>
        <a className={css.link} href="https://github.com/yifanwww/easy-projs" target="_blank" rel="noopener noreferrer">
            Learn easy-projs
        </a>
    </header>
);
