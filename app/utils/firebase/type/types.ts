import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

type DocumentReferenceType = DocumentReference<DocumentData, DocumentData>;
type CollectionReferenceType = CollectionReference<DocumentData, DocumentData>;
type QuerySnapshotType = QuerySnapshot<DocumentData, DocumentData>;
type DocumentSnapshotType = DocumentSnapshot<DocumentData, DocumentData>;

type FoodDataType = {
  [FoodData: string | number]: string | number;
}[];
type MenuState = {
  productName: string;
  value: number;
  detail: string;
  id?: string;
  created_date?: { seconds: string; nanoseconds: string };
};

type orderDataType = {
    [id: string]: {
      count: number;
      productName?: string;
      value: number;
      
    };
  };
export type {
  DocumentReferenceType,
  CollectionReferenceType,
  QuerySnapshotType,
  DocumentSnapshotType,
  FoodDataType,
  MenuState,
  orderDataType,
};
