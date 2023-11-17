// next.config.js
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Encuentra la regla de estilo de Material-UI
    const muiStyleRule = config.module.rules.find(
      (rule) =>
        rule.oneOf &&
        rule.oneOf.some((subRule) => subRule.issuer && subRule.issuer.include && subRule.issuer.include.includes('@mui')),
    );

    // Encuentra la regla de tus estilos CSS modules
    const cssModulesRule = config.module.rules.find(
      (rule) => rule.oneOf && rule.oneOf.some((subRule) => String(subRule.test) === String(/\.module\.css$/)),
    );

    // Asegúrate de que los estilos de Material-UI tengan una prioridad adecuada
    if (muiStyleRule) {
      muiStyleRule.issuer = { ...muiStyleRule.issuer, priority: 1 };
    }

    // Asegúrate de que tus estilos CSS modules tengan una prioridad adecuada
    if (cssModulesRule) {
      cssModulesRule.issuer = { ...cssModulesRule.issuer, priority: 2 };
    }

    return config;
  },
};

module.exports = nextConfig;