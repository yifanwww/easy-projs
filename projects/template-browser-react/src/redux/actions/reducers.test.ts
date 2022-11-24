import { getInitialState, _actions, _reducer } from './slice';

{
    const name = '_finishPreparing';

    describe(`Test redux reducer \`${name}\``, () => {
        it('should finish preparing', () => {
            const prevState = getInitialState();

            expect(_reducer(prevState, _actions[name]()).prepared).toMatchSnapshot();
        });
    });
}
