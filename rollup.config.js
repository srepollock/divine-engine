import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from '@joseph184/rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from "./package.json";

export default [
    {
        input: './src/index.ts',
        plugins: [
            typescript(),
        ],
        external: [
            "three"
        ],
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
            resolve({
                preferBuiltins: true,
                mainFields: ['module', 'main'],
            }),
            globals({
                process: true,
                global: true,
                dirname: true,
                filename: true
            }),
            builtins(),
            commonjs(),
            typescript(),
            babel({
                babelrc: true
            }),
        ],
        external: [
            "three"
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
