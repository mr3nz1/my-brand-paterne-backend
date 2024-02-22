// jest.setup.js

import mongoose from 'mongoose';

// Close database connection after all tests finish
afterAll(async () => {
    await mongoose.disconnect();
});
