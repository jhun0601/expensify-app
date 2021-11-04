import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

import "firebase/compat/firestore";
import "firebase/compat/storage";
import constantApiKey from "./firebase.config";

const firebaseConfig = constantApiKey();
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const db = getDatabase();
set(ref(db), {
    name: "jhunmark",
    age: 32,
    isSingle: false,
    location: {
        city: "Metro Manila",
        country: "Philippines",
    },
});

set(ref(db, "age"), 29);

set(ref(db, "location/city"), "Quezon City");
set(ref(db, "attributes"), {
    height: "178cm",
    weight: "80kg",
});
