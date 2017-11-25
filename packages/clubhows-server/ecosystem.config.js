module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : 'app.js',
      env: {
        MAIL_SMTP: 'smtp.mailgun.org',
        MAIL_USER: 'hello@clubhows.com',
        MAIL_PASS: 'h0w5C!Ub2@17',
        MAIL_PORT: 465,
        MAILGUN_APIKEY: 'key-cb17ab655601aa58b0a201da3235fc56'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'arbiterofhere',
      host : '165.227.2.211',
      ref  : 'clubhows/deploy-server',
      repo : 'git@github.com:ClubHows/clubhows.git',
      path : '/var/www/server',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}; 
