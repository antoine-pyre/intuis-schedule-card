import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/intuis-schedule-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    !dev && terser({
      format: {
        comments: false,
      },
    }),
  ].filter(Boolean),
};
