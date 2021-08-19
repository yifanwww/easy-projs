import { useEffect } from 'react';

import { Introduction } from '../Components/Introduction';
import { useMainDispatchingThunks, usePrepared } from '../Redux';

import scss from './ClientArea.module.scss';

export function ClientArea() {
    const prepared = usePrepared();
    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return <div className={scss.clientArea}>{prepared && <Introduction />}</div>;
}
