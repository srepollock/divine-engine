import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/daemon.module.js',
            format: 'umd',
            name: 'daemon'
        },
        {
            file: './lib/daemon.js',
            format: 'cjs',
        }
    ],
    plugins: [
        typescript(),
        babel()
    ]
}