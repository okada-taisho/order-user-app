import {
  collection,
  getDocs,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import db from "@/lib/firebase";
import {
  CollectionReferenceType,
  DocumentReferenceType,
  DocumentSnapshotType,
  QuerySnapshotType,
} from "./type/types";

const fetchMenuData = async (): Promise<DocumentData[] | null> => {
  try {
    const menuCol = collection(db, "menu");
    const MenuSnapshot: QuerySnapshotType = await getDocs(menuCol);

    if (!MenuSnapshot.empty) {
      const FoodList: DocumentData[] = MenuSnapshot.docs.map((doc) =>
        doc.data()
      );
      return FoodList;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

const getDBFoodById = async (
  documentId: string
): Promise<DocumentData | null> => {
  try {
    const FoodsCol: CollectionReferenceType = collection(db, "menu");
    const FoodDocRef: DocumentReferenceType = doc(FoodsCol, documentId);
    const FoodSnapshot: DocumentSnapshotType = await getDoc(FoodDocRef);

    if (FoodSnapshot.exists()) {
      const FoodData: DocumentData = FoodSnapshot.data();
      return FoodData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { fetchMenuData, getDBFoodById };
