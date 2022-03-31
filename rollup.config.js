import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import pkg from './package.json';
import ttypescript from 'ttypescript';

const builds = [
  {
    file: pkg.module,
    format: 'es',
    checkTypescript: true,
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.unpkg,
    format: 'iife',
    browser: true,
    plugins: [
      nodePolyfills({ crypto: true }),
    ],
  },
  {
    file: pkg.browser,
    format: 'es',
    browser: true,
    plugins: [
      nodePolyfills({ crypto: true }),
    ],
  },
]

const createConfig = (build) => {
  const {
    file,
    format,
    sourcemap = true,
    browser = false,
    checkTypescript = false,
    plugins = [],
    globals = {},
  } = build;

  const allGlobals = {
    "@aws-sdk/client-s3": "AwsS3Client",
    "@bundlr-network/client": "BundlrNetworkClient",
    "@metaplex-foundation/beet": "MetaplexBeet",
    "@metaplex-foundation/beet-solana": "MetaplexBeetSolana",
    "@metaplex-foundation/mpl-core": "MetaplexMplCore",
    "@solana/spl-token": "SolanaSplToken",
    "@solana/wallet-adapter-base": "SolanaWalletAdapterBase",
    "@solana/web3.js": "SolanaWeb3",
    "bn.js": "BN",
    "bs58": "Bs58",
    "buffer": "Buffer",
    "mime": "Mime",
    "nft.storage": "NftStorageClient",
    "tweetnacl": "Tweetnacl",
    ...globals,
  }

  return {
    input: 'src/index.ts',
    output: {
      name: 'Metaplex',
      file,
      format,
      sourcemap,
      globals: allGlobals,
      externalLiveBindings: false,
    },
    external: Object.keys(allGlobals),
    plugins: [
      resolve({
        browser,
        dedupe: ['bn.js', 'buffer'],
        extensions: ['.ts', '.js'],
        preferBuiltins: !browser,
      }),
      typescript({
        typescript: ttypescript,
        check: checkTypescript,
        useTsconfigDeclarationDir: checkTypescript,
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: sourcemap,
            declaration: checkTypescript,
            declarationMap: checkTypescript,
          },
        },
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.BROWSER': JSON.stringify(browser),
        },
      }),
      ...plugins,
    ],
    onwarn: function (warning, rollupWarn) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        rollupWarn(warning);
      }
    },
  }
}

export default builds.map(build => createConfig(build));
