import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { builtinModules } from 'module';

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
        builtins(),
        typescript(),
        babel()
    ]
}