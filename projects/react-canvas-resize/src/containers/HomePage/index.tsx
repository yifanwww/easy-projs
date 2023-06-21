import { useEffect, useRef } from 'react';

import css from './styles.module.scss';

function HomePage(): JSX.Element {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;

        const observer = new ResizeObserver(() => {
            if (canvas) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;

                // eslint-disable-next-line no-console
                console.info(
                    { width: canvas?.width, height: canvas?.height },
                    { clientWidth: canvas?.clientWidth, clientHeight: canvas?.clientHeight },
                );
            }
        });
        if (canvas) {
            observer.observe(canvas);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={css.page}>
            <div className={css['canvas-container']}>
                <canvas ref={ref} className={css.canvas} />
            </div>
        </div>
    );
}

export default HomePage;
