import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from "./package.json";

export default {
    input: './src/index.ts',
    plugins: [
        typescript(),
        babel({
            babelrc: false,
            presets: [["@babel/preset-env", {"modules": false}]],
            runtimeHelpers: true
        }),
        builtins(),
        resolve({
            preferBuiltins: true,
            browser: true
        }),
        commonjs(),
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
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    watch: {
        include: [
            "src/**/*.ts"
        ],
        exclude: [
            
        ]
    }
}
