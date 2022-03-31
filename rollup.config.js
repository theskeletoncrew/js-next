import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json';

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
]

const createConfig = (build) => {
  console.log(build);

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
        dedupe: [
          '@bundlr-network/client',
          '@metaplex-foundation/beet',
          'tweetnacl',
          'brorand',
          'bn.js',
          'buffer',
        ],
        extensions: ['.ts', '.js'],
        preferBuiltins: !browser,
      }),
      typescript({
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

const configs = builds.map(build => createConfig(build));
console.log(configs);

export default configs;
