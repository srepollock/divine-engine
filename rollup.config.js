import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from "./package.json";

export default {
    input: './src/index.ts',
    external: [
        "'fs'"
    ],
    plugins: [
        globals(),
        builtins({
            fs: true
        }),
        resolve(),
        typescript(),
        commonjs(),
        babel({
            babelrc: false,
            presets: [["@babel/preset-env", {"modules": false}]],
            runtimeHelpers: true
        })
    ],
    watch: {
        include: 'src/**/*.ts'
    },
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'Divine'
        },
        {
            file: "./lib/divine.cjs.js",
            format: 'cjs',
            name: 'Divine'
        },
        {
            file: pkg.module,
            format: 'es',
            name: 'Divine'
        },
    ],
}