import {scriptSetup} from './scripts/script-setup';
import {COLLECTIONS} from './collections/collections';

const admin = scriptSetup();

async function exec() {
  const fStore = admin.firestore();

  for (const collection of COLLECTIONS) {
    for (const document of collection.documents) {
      const {id, ...data} = document;

      await fStore.collection(collection.name).doc(id).set(data);
    }
  }
}

exec()
  .then(() => {
    console.log('Setup completely successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
