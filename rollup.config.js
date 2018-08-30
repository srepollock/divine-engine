import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import pkg from "./package.json";

export default {
    input: './src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'Divine'
        },
        {
            file: pkg.module,
            format: 'es',
            name: 'Divine'
        }
    ],
    plugins: [
        globals(),
        builtins(),
        typescript(),
        commonjs(),
        babel({
            babelrc: false,
            presets: [["@babel/preset-env", {"modules": false}]],
            runtimeHelpers: true
        })
    ]
}