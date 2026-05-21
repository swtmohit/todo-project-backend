const mongoose = require('mongoose');

const maskMongoUri = (uri = '') => uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('MongoDB connection failed: MONGODB_URI is missing in the .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(`- Message: ${error.message}`);

    if (error.code) {
      console.error(`- Code: ${error.code}`);
    }

    if (error.name) {
      console.error(`- Error Name: ${error.name}`);
    }

    console.error(`- URI: ${maskMongoUri(mongoUri)}`);

    if (error.message.includes('querySrv')) {
      console.error('- Hint: This usually means a DNS, internet, VPN, firewall, or MongoDB Atlas SRV resolution issue.');
    }

    if (error.message.includes('authentication failed')) {
      console.error('- Hint: Check Atlas database username/password and URL encoding for special characters.');
    }

    console.error('- Checklist: verify Atlas Network Access, cluster status, and the MONGODB_URI value in .env');
    process.exit(1);
  }
};

module.exports = connectDB;
