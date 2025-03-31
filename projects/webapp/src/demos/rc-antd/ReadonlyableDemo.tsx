import { Readonlyable } from '@easy-pkg/rc-antd';
import { Button } from 'antd';
import { useState } from 'react';

import { DemoLayout } from '../components/DemoLayout';
import { ExampleList } from '../components/ExampleList';

export function ReadonlyableDemo() {
    const [readonly, setReadonly] = useState(false);
    const [text, setText] = useState('Readonlyable Input');

    return (
        <DemoLayout>
            <h1>Readonlyable</h1>
            <h2>Examples</h2>
            <h3>Basic</h3>
            <ExampleList>
                <Button onClick={() => setReadonly((prev) => !prev)}>{readonly ? 'writeable' : 'readonly'}</Button>
                <Readonlyable.Input
                    readonly={readonly}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
            </ExampleList>
        </DemoLayout>
    );
}
