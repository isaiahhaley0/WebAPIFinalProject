const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "mysecretjwtkey",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb+srv://Test:password1234@roundup.1xnaq.mongodb.net/Roundup?retryWrites=true&w=majority' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '3000') +
    '/Roundup',
  stripe_connect_test_client_id: 'ca_FkyHCg7X8mlvCUdMDao4mMxagUfhIwXb',
  stripe_test_secret_key: 'sk_test_51IdjFtJmAVwnn4iCIlr0LRq0FxYiC4UYs6hxERVJ7JaMzpYPlwo3lqSOQGPSVKq5y3KWwYbo8CwMSfvPcKy17QxX00ZZvCavOP',
  stripe_test_api_key: 'pk_test_51IdjFtJmAVwnn4iCVLqTkNl8Lb4gfiVEROmQGAbIhPFUEJAVJoXab0FuD9Zgtr0s5h4FvekH63QLFbE6PAQ9i4BC00k4BWM95A'
}

export default config
