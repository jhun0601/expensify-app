import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    remove,
    set,
    update,
    child,
    get,
    onValue,
    push,
} from "firebase/database";

import {
    doc,
    setDoc,
    updateDoc,
    // enableNetwork,
} from "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase();

export { firebaseApp, db as default };
// const dbref = ref(db);

// push(ref(db, "expenses"), {
//     description: "Electric Bill",
//     note: "",
//     amount: 10099.33,
//     createdAt: 23212321311313,
// });

// push(ref(db, "expenses"), {
//     description: "Internet Bill",
//     note: "",
//     amount: 1699.0,
//     createdAt: 22132311313,
// });

// onValue(ref(db, "expenses"), (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val(),
//         });
//     });
//     console.log(expenses);
// });

// onValue(ref(db, "child_change"), (snapshot) => {
//     console.log(snapshot.key, " ", snapshot.val());
// });
// update(ref(db, "notes/-Mnj03I2EXjAWqRAzrdZ"), {
//     title: "Accenture training",
//     body: "Code :  React Full Course",
// });

// push(ref(db, "notes"), {
//     title: "Heloow work",
//     body: "hehehe",
// });
// const firebaseNotes = {
//     notes: {
//         kahsdk: {
//             title: "firstnote",
//             body: "notenotenote",
//         },
//         aksjdashdkh: {
//             title: "firstnoteasd",
//             body: "notenotenoteasdad",
//         },
//     },
// };
// const notes = [
//     {
//         id: 1,
//         title: "title one",
//         note: "note 1",
//     },
//     {
//         id: 2,
//         title: "title two",
//         note: "note 2",
//     },
// ];

// set(ref(db, "notes"), notes);
// onValue(dbref, (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });
// set(ref(db), {
//     name: "jhunmark",
//     age: 32,
//     isSingle: false,
//     location: {
//         city: "Metro Manila",
//         country: "Philippines",
//     },
// })
//     .then(() => {
//         console.log("Data is saved");
//     })
//     .catch((e) => {
//         console.log("this failed ", e);
//     });

// set(ref(db, "attributes"), {
//     height: "178cm",
//     weight: "80kg",
// })
//     .then(() => {
//         console.log("this is saved 1");
//     })
//     .catch((e) => {
//         console.log("This failed ", e);
//     });
// {
// }

// update(ref(db), {
//     name: "Jhunmark Bonnen Ng",
//     "location/city": "manila",
// });
// ref(db)
//     .once("value")
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log("error - ", e);
//     });

// remove(ref(db, "isSingle"))
//     .then(() => {
//         console.log("removed");
//     })
//     .catch((e) => {
//         console.log("remove failed ", e);
//     });

// console.log(db.collection().doc());

// set(ref(db), {
//     name: "jhunmark",
//     age: 32,
//     isSingle: false,
//     location: {
//         city: "Metro Manila",
//         country: "Philippines",
//     },
// })
//     .then(() => {
//         console.log("Data is saved");
//     })
//     .catch((e) => {
//         console.log("this failed ", e);
//     });

// update(ref(db), {
//     job: {
//         company: "Accenture",
//         title: "Software Developer",
//     },
// })
//     .then(() => {
//         console.log("Data is saved");
//     })
//     .catch((e) => {
//         console.log("this failed ", e);
//     });
