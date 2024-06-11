export function downloadFileFromUrl(href: string, filename: string) {
    const element = document.createElement('a');
    element.style.display = 'none';
    element.download = filename;
    element.href = href;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function downloadFileFromObject(object: Blob | MediaSource, filename: string) {
    const href = window.URL.createObjectURL(object);
    downloadFileFromUrl(href, filename);
    window.URL.revokeObjectURL(href);
}
