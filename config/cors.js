const corsOptions = {
    origin: [
      'http://localhost:5173',
      /^http:\/\/[a-zA-Z0-9-]+\.localhost:5173$/,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  
  module.exports = corsOptions;