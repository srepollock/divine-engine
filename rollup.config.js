import typescript from 'rollup-plugin-typescript2';
import globals from 'rollup-plugin-node-globals';
import builtins from '@joseph184/rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import pkg from "./package.json";

export default [
    {
        input: "./src/index.ts",
        plugins: [
            globals({
                process: true,
                global: true,
                dirname: true,
                filename: true
            }),
            resolve({
                mainFields: ["module", "main"],
                preferBuiltins: true,
                modulesOnly: true,
                
            }),
            builtins(),
            typescript(),
        ],
        output: [
            {
                file: pkg.module,
                format: "es"
            },
            {
                file: pkg.main,
                name: "Divine",
                format: "umd"
            }
        ]
    }
]
