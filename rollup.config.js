import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default {
    external: [
        "stream"
    ],
    input: 'dist/index.js', // Required
    plugins: [
        globals(),
        builtins(),
        nodeResolve(),
        commonjs(),
    ],
    output: [ // Required; Array = multiple outputs
        {
            file: pkg.main,
            format: 'umd',
            name: 'Sunset'
        },
        {
            file: "lib/sunset.cjs.js",
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
