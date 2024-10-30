export class ReadableStreamUtil {
    /**
     * We can consume readable stream using asynchronous iteration, see
     * https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#consuming_a_fetch_using_asynchronous_iteration
     *
     * But it's not widely enough supported, see
     * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#browser_compatibility
     *
     * This implemetation comes from https://stackoverflow.com/a/77377871
     */
    static async *iterate<T>(stream: ReadableStream<T>) {
        const reader = stream.getReader();
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) return;
                yield value;
            }
        } finally {
            reader.releaseLock();
        }
    }
}
