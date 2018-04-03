import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.ts',
    output: [
        {
            file: './build/bundle.module.js',
            format: 'es'
        },
        {
            file: './build/bundle.js',
            format: 'cjs',
        }
    ],
    plugins: [
        typescript(),
        babel()
    ]
}