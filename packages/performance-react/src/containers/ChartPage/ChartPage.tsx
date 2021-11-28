import { BenchmarkLineChart } from 'src/components/Charts';

import scss from './ChartPage.module.scss';

export function ChartPage(): React.ReactElement {
    return (
        <div className={scss.root}>
            <BenchmarkLineChart />
        </div>
    );
}
