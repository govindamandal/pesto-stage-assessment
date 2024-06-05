import mongoose from 'mongoose';

const connectDatabse = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/stage';
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDatabse;
