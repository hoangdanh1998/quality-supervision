import mongoose from 'mongoose';
export default function (url, app): void {
mongoose.connect(url).catch(err => {
    console.log("📖 ~ file: mongoose.ts ~ line 8 ~ err", err)
    process.exit(1);
  });

  var db = mongoose.connection;
  db.once('open', function() {
    console.log("Connection db Successful!");
  })

  app.set('mongooseClient', mongoose);
}