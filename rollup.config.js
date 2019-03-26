import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import typescript from 'rollup-plugin-typescript2';
import pkg from "./package.json";

export default {
    input: './dist/index.js',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'Sunset'
        },
        {
            file: "./lib/sunset.cjs.js",
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
    ],
    external: [
        'stream'
    ],
    plugins: [
        globals(),
        builtins(),
        typescript({tsconfigOverride: {compilerOptions: {declaration: false}}})
    ]
}
