import type { Fiber } from 'src/common/fiber';

interface ReactElementObject extends React.ReactElement {
    _owner: Fiber;
}

export const getElementOwner = (element?: React.ReactElement) => ((element ?? <div />) as ReactElementObject)._owner;
