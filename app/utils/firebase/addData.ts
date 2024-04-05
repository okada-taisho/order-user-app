import db from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { orderDataType } from "./type/types";
import { createCurrentDate } from "../utils";

const addData = async (param: orderDataType): Promise<void> => {
  const { uid, currentDate } = createCurrentDate();

  try {
    await setDoc(doc(db, "order", uid), {
      order:{
        ...param,
      },
      id: uid,
      created_date: currentDate,
    });
  } catch (err) {
    throw new Error("エラーが発生致しました。");
  }
};

export default addData;
