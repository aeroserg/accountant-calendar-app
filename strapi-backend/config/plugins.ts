export default () => ({
    documentation: {
      enabled: true,
      config: {
        info: {
          title: "Strapi API",
          description: "Документация сгенерирована автоматически",
          version: "1.0.0",
        },
      },
    },
    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: "user@example.com",
            pass: "yourEmailPassword",
          },
        },
        settings: {
          defaultFrom: "noreply@example.com",
          defaultReplyTo: "support@example.com",
        },
      },
    },
    upload: {
        enabled: true,
        config: {
          provider: 'local',
          providerOptions: {
            sizeLimit: 100000000,
            uploadFolder: './public/uploads',
          },
        },
      },
  });
  