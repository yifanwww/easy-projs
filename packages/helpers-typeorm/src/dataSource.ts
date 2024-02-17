import { Err, type Result } from 'rustlike-result';
import { type EntityManager, type DataSource } from 'typeorm';

export async function resultifiedTransaction<Res, Err>(
    dataSource: DataSource,
    runInTransaction: (entityManager: EntityManager) => Promise<Result<Res, Err>>,
): Promise<Result<Res, Err | Error>> {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const result = await runInTransaction(queryRunner.manager);
        if (result.isErr()) {
            await queryRunner.rollbackTransaction();
            return result;
        }

        await queryRunner.commitTransaction();
        return result;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        return err instanceof Error ? Err(err) : Err(new Error(typeof err === 'string' ? err : 'unknown error'));
    } finally {
        await queryRunner.release();
    }
}
