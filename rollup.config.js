import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    name: 'inkgeom2d',
    format: 'umd',
    sourcemap: true
  },
  plugins: [typescript({ target: 'es6' }), terser()]
}
