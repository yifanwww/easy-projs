import { useEffect } from 'react';

import { Introduction } from '../components/Introduction';
import { useMainDispatchingThunks, usePrepared } from '../redux';

import scss from './ClientArea.module.scss';

export function ClientArea() {
    const prepared = usePrepared();
    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return <div className={scss.clientarea}>{prepared && <Introduction />}</div>;
}
