import { forwardRef } from 'react';
import scss from './Charts.module.scss';

export const ChartContainer = forwardRef<HTMLDivElement>((props, ref) => {
    return <div className={scss.container} ref={ref} />;
});
