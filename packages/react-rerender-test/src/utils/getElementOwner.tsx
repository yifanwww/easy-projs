import { Fiber } from 'src/common/fiber';

interface IReactElementObject extends React.ReactElement {
    _owner: Fiber;
}

export const getElementOwner = (element?: React.ReactElement) => ((element ?? <div />) as IReactElementObject)._owner;
