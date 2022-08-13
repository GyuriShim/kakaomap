import { firestore } from "../firebase";
import firebase from "firebase/compat/app"

export const matchingCollection = firestore.collection("matching")

export function createMatching({user, coordinate, address, deliveryTime, postId}){
    return matchingCollection.add({
        user,
        coordinate,
        address,
        deliveryTime,
        postId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}