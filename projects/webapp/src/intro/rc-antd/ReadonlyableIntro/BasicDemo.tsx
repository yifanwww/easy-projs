import { Readonlyable } from '@easy-pkg/rc-antd';
import { Button, Flex } from 'antd';
import { useState } from 'react';

export function BasicDemo() {
    const [readonly, setReadonly] = useState(false);
    const [text, setText] = useState('Readonlyable Input');

    return (
        <Flex gap={8} align="center">
            <Button onClick={() => setReadonly((prev) => !prev)}>{readonly ? 'readonly' : 'writeable'}</Button>
            <Readonlyable.Input readonly={readonly} value={text} onChange={(event) => setText(event.target.value)} />
        </Flex>
    );
}
