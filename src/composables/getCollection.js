import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import {
  orderBy,
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

const getCollection = (cols, qry) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  // let collectionRef = projectFirestore
  //   .collection(collection)
  //   .orderBy("createdAt");
  let collectionRef = collection(projectFirestore, cols);
  let q = query(collectionRef, orderBy("createdAt"));

  if (qry) {
    q = query(collectionRef, where(...qry), orderBy("createdAt"));
  }

  // const unsub = collectionRef.onSnapshot(
  //   (snap) => {
  //     let results = [];
  //     snap.docs.forEach((doc) => {
  //       // must wait for the server to create the timestamp & send it back
  //       doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
  //     });

  //     // update values
  //     documents.value = results;
  //     error.value = null;
  //   },
  //   (err) => {
  //     console.log(err.message);
  //     documents.value = null;
  //     error.value = "could not fetch the data";
  //   }
  // );

  const unsub = onSnapshot(
    q,
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
