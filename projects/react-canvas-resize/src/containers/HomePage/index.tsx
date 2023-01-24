import { useRef } from 'react';

import css from './styles.module.scss';

const HomePage: React.FC = () => {
    const divRef1 = useRef<HTMLDivElement>(null);
    const divRef2 = useRef<HTMLDivElement>(null);

    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);

    return (
        <div className={css.page}>
            <div ref={divRef1} className={css['canvas-container']}>
                <canvas ref={canvasRef1} className={css.canvas} />
            </div>
            <div ref={divRef2} className={css['canvas-container']}>
                <canvas ref={canvasRef2} className={css.canvas} />
            </div>
        </div>
    );
};

export default HomePage;
