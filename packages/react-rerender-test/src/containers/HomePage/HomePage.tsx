import { Introduction } from 'src/components/Introduction';
import { PageContainer } from 'src/components/Page';

export function HomePage(): React.ReactElement {
    return (
        <PageContainer>
            <Introduction />
        </PageContainer>
    );
}
