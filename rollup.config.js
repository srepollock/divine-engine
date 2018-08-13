import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/divine.js',
            format: 'cjs',
        },
        {
            file: './lib/divine.module.js',
            format: 'umd',
            name: 'divine'
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