import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import { uglify } from "rollup-plugin-uglify"

const isDev = process.env.NODE_ENV !== 'production'

export default {
    input: 'hybridize.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        !isDev && uglify(),
        isDev && serve({
            contentBase: 'dist',
            host: 'localhost',
            port: 8000,
        })
    ]
}