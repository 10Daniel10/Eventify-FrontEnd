module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            // Establece la prioridad de los estilos
            insert: 'body',
          },
        },
        {
          loader: 'css-loader',
          options: {
            // Establece la prioridad de los estilos
            importLoaders: 1,
          },
        },
      ],
    });
    return config;
  },
}