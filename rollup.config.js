import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

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
            name: 'daemon'
        }
    ],
    plugins: [
        typescript(),
        babel()
    ]
}