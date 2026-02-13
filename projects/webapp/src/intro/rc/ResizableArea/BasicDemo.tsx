import { ResizableArea } from '@easy-lib/rc';
import { Flex } from 'antd';

export function BasicDemo() {
    return (
        <Flex vertical gap="middle">
            <ResizableArea>
                React lets you build user interfaces out of individual pieces called components. Create your own React
                components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and
                apps.
            </ResizableArea>
            <ResizableArea vertical style={{ width: '256px' }}>
                React lets you build user interfaces out of individual pieces called components. Create your own React
                components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and
                apps.
            </ResizableArea>
        </Flex>
    );
}
