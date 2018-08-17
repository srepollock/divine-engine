import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import pkg from "./package.json";

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/divine.js',
            format: 'cjs',
            name: 'Divine'
        },
        {
            file: './lib/divine.module.js',
            format: 'umd',
            name: 'Divine'
        }
    ],
    plugins: [
        globals(),
        builtins(),
        typescript(),
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }]]
        })
    ]
}