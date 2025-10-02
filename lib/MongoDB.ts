import mongoose from "mongoose";
// types/global.d.ts


declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Use the global variable for cached connection
let cached = global.mongoose;
if (!cached) global.mongoose = cached = { conn: null, promise: null };

const database= async()=> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL!)
      .then((mongoose) => mongoose.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default database