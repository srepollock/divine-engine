import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.ts',
    output: [
        {
            file: './build/daemon.module.js',
            format: 'es'
        },
        {
            file: './build/daemon.js',
            format: 'cjs',
        }
    ],
    plugins: [
        typescript(),
        babel()
    ]
}