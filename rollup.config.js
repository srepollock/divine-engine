import typescript from 'rollup-plugin-typescript2';
import pkg from "./package.json";

let override = { compilerOptions: { declaration: false } };

export default [
    {
        input: "./src/index.ts",
        plugins: [
            typescript({tsconfigOverride: override}),
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
