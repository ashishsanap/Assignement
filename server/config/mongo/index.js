import mongoose from 'mongoose';

export default function connectMongo() {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  return new Promise((resolve, reject) => mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
  })
    .then(yes => resolve('conneted', yes))
    .catch(err => reject(`not connected${err}`, err)));
}

export function getObjectID(ID) {
  return mongoose.Types.ObjectId(ID);
}
