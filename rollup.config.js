import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from "./package.json";

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: pkg.module,
                format: 'es'
            }
        ]
    },
    {
        input: './src/index.ts',
        plugins: [
            commonjs(),
            typescript(),
            babel({
                babelrc: true,
                exclude: "./src/**/test/**/*.spec.ts"
            }),
            builtins(),
            resolve({
                preferBuiltins: true,
                browser: true
            }),
            globals({
                process: true,
                global: true,
                dirname: true,
                filename: true
            }),
        ],
        output: [ // Required; Array = multiple outputs
            {
                file: pkg.main,
                format: 'umd',
                name: 'Divine'
            },
            {
                file: "lib/divine.cjs.js",
                format: 'cjs'
            }
        ]
    }
]
