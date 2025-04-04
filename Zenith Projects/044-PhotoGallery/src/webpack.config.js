module.exports = {
    // ... other configurations ...
    module: {
      rules: [
        {
          test: /\.(jpg|png|jpeg)$/,
          use: [
            {
              loader: 'image-webpack-plugin',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
              },
            },
          ],
        },
      ],
    },
  };