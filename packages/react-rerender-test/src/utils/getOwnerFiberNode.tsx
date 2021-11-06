import { FiberNode } from 'src/common/fiberNode';

interface IReactElementObject {
    _owner: FiberNode;
}

export const getOwnerFiberNode = () => ((<div />) as unknown as IReactElementObject)._owner;
