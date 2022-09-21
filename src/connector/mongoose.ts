import mongoose from 'mongoose';

export default function (mongoUrl:any): void {
  mongoose.connect(
    mongoUrl
  ).catch(err => {
    console.log("📖 ~ file: mongoose.ts ~ line 8 ~ err", err)
    process.exit(1);
  });
}