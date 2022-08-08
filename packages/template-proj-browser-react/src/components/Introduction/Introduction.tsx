import Assets from '@easy/assets';

import scss from './Introduction.module.scss';

export const Introduction: React.FC = () => {
    return (
        <header className={scss.introduction}>
            <img className={scss.logo} src={Assets.logo} alt="logo" />
            <p>
                Edit <code>src/components/Introduction/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={scss.link}
                href="https://github.com/yifanwww/easy-projs"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn easy-projs
            </a>
        </header>
    );
};
