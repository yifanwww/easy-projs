import loaderUtils from 'loader-utils';
import path from 'node:path';
import type { LoaderContext } from 'webpack';

export function getCSSModuleLocalIdent(
    context: LoaderContext<any>,
    localIdentName: string,
    localName: string,
    options: any,
) {
    // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
    const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/) ? '[folder]' : '[name]';
    // Create a hash based on a the file location and class name.
    // Will be unique across a project, and close to globally unique.
    const hash = loaderUtils.getHashDigest(
        // @ts-ignore
        path.posix.relative(context.rootContext, context.resourcePath) + localName,
        'md5',
        'base64',
        5,
    );
    // Use loaderUtils to find the file or folder name
    const className = loaderUtils.interpolateName(
        context as never,
        `${fileNameOrFolder}_${localName}__${hash}`,
        options,
    );
    // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
    return className.replace('.module_', '_').replace(/\./g, '_');
}
