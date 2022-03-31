import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import ttypescript from 'ttypescript';

const builds = [
  {
    dir: 'dist/esm',
    format: 'es',
    checkTypescript: true,
  },
  {
    dir: 'dist/cjs',
    format: 'cjs',
  },
  {
    file: 'dist/iife/index.js',
    format: 'iife',
    browser: true,
    preserveModules: false,
  },
  {
    dir: 'dist/esm-browser',
    format: 'es',
    browser: true,
  },
]

const createConfig = (build) => {
  const {
    file,
    dir,
    format,
    preserveModules = true,
    sourcemap = true,
    browser = false,
    checkTypescript = false,
    plugins = [],
  } = build;

  const globals = {
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
  }

  const bundleInBrowser = [
    "@metaplex-foundation/beet",
    "@metaplex-foundation/beet-solana",
    "@metaplex-foundation/mpl-core",
    "buffer",
  ];

  const external = Object.keys(globals).filter(dependency => {
    return !browser || !bundleInBrowser.includes(dependency);
  });

  return {
    input: 'src/index.ts',
    output: {
      name: 'Metaplex',
      file,
      dir,
      format,
      sourcemap,
      globals,
      externalLiveBindings: false,
      preserveModules,
    },
    external,
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
      ...(browser ? [nodePolyfills({ crypto: true })] : []),
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
