// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import {addDoc, collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export interface OverviewItem {
  title: string;
  description: string;
  subtitle: string;
  startTime: Date;
  endTime: Date;
  location: string;
  organizer?: string;
  status?: string
  id: string;

  [key: string]: any;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHurpck3BL59qUifmjwMvjuVIta6GEigw",
  authDomain: "swigg-38aa4.firebaseapp.com",
  projectId: "swigg-38aa4",
  storageBucket: "swigg-38aa4.appspot.com",
  messagingSenderId: "289326200445",
  appId: "1:289326200445:web:1203ace700764f4fdc6314"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => {
  auth.signOut()
}
const db = getFirestore(app)


const getOverviewItems = async (): Promise<OverviewItem[]> => {
  const overviewItems: OverviewItem[] = [];
  const overviewRef = collection(db, 'overviews');

  await getDocs(overviewRef).then((snap) => {
    snap.forEach((doc) => {
      // console.log(doc.id)
      const item = { id: doc.id, ...doc.data()} as OverviewItem;
      if (item.status == 'publish') overviewItems.push(item);
    });
  });

  return overviewItems;
};

const addWaitlistEmail = async (
    email: string
): Promise<{ email: any, [key: string]: any }> => {
  try {
    const waitListRef = collection(db, 'waitlist');
    const docRef = await addDoc(waitListRef, {email})
    const waitlistItem = {
      email: email,
    };
    return waitlistItem;
  } catch (err) {
    // console.log(err)
    throw new Error('Could not create overview item.');
  }
}

const updateOverviewItem = async (overviewItemId: string,
                                  data: { [key: string]: any },): Promise<any> => {
  try {
    const doc = await firebase
        .firestore()
        .collection('overviews')
        .doc(overviewItemId)
        .update(data);

    return doc;
  } catch (error) {
    throw new Error(error);
  }
}


const createOverviewItem = async (
    overviewItem: OverviewItem
): Promise<OverviewItem> => {
  try {
    const overviewsRef = firebase.firestore().collection('overviews');
    const overviewSnap = await overviewsRef.add({
      title: overviewItem.title,
      description: overviewItem.description,
      subtitle: overviewItem.description,
      startTime: overviewItem.startTime.toISOString(),
      endTime: overviewItem.endTime.toISOString(),
      location: overviewItem.location,
      organizer: overviewItem.organizer
    });
    const overviewData = await overviewSnap.get();
    const overview: OverviewItem = {
      id: overviewData.get('id'),
      title: overviewData.get('title'),
      description: overviewData.get('description'),
      startTime: overviewData.get('startTime'),
      endTime: overviewData.get('endTime'),
      location: overviewData.get('location'),
      subtitle: overviewData.get('subtitle'),
      organizer: overviewData.get('organizer')
    };
    return overview;
  } catch (err) {
    throw new Error('Could not create overview item.');
  }
}

const removeOverviewItem = async (id: string) => {
  try {
    const db = firebase.firestore();
    const overviewRef = db.collection('overview').doc(id);
    const overviewItem = await overviewRef.get();
    if (overviewItem.exists) {
      await overviewRef.delete();
      return overviewItem.data();
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getItem = async (id: string) => {
  const overviewRef = doc(db, `overviews`, id);
  try {
    const doc = await getDoc(overviewRef)
    return {
      id: doc.id,
     ...doc.data()
    } as OverviewItem
  } catch (e) {
    // console.log("Error getting cached document:", e);
  }
}

const isAuthorized = async () => {
  const user = await firebase.auth().currentUser
  if(!user) return false;
  try {
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult()
    // console.log(idTokenResult)
  } catch (e) {
    // console.log('Error with idTokenResult' )
    console.error(e)
  }
}

export {db, isAuthorized, app,getItem, getOverviewItems, updateOverviewItem, createOverviewItem, removeOverviewItem, addWaitlistEmail}
export default firebase