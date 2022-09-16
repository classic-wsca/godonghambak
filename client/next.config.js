/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  // 피그마에서 잘못된 마스크가 넘어올 경우 이를 해결
                  removeRasterImages: false,
                  removeStyleElement: false,
                  removeUnknownsAndDefaults: false,
                  // svgr이 svg의 크기를 수정할 수 있도록 변경
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
