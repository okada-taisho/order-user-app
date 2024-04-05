import {  json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useLoaderData } from "@remix-run/react";
import { fetchMenuData } from "@/utils/firebase/query";
import { useState } from "react";
import SubmitForm from "@/components/submitForm/submitForm";
import { MenuState, orderDataType } from "@/utils/firebase/type/types";
import { Button } from "@/components/ui/button";


export const meta: MetaFunction = () => {
  return [
    { title: "ユーザーアプリ" },
    { name: "description", content: "ユーザーアプリ" },
  ];
};



export const loader: LoaderFunction = async () => {
  const menuData = await fetchMenuData();
  return json(menuData);
};

export default function Index() {
  const menuList = useLoaderData<typeof loader>();
  const [orderData, setOrderData] = useState<orderDataType>({});

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        maxWidth: "800px",
        margin: "60px auto 0",
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">商品名</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>価格</TableHead>
            <TableHead className="text-right">個数</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuList.map((menu: MenuState) => (
            <TableRow key={menu.id}>
              <TableCell className="font-medium">{menu.productName}</TableCell>
              <TableCell>{menu.detail}</TableCell>
              <TableCell>{menu.value}</TableCell>
              <TableCell className="text-right">
                <Button
                  data-id={menu.id}
                  data-name={menu.productName}
                  data-price={menu.value}
                  onClick={(e) => {
                    const { dataset } = e.currentTarget as HTMLButtonElement;
                    const id = dataset.id;
                    const productName = dataset.name;
                    const price = Number(dataset.price);

                    if (id && price) {
                      setOrderData((prevOrderData) => {
                        const productCount =
                          (prevOrderData[id]?.count || 0) + 1;
                        const updatedOrderData:orderDataType = {
                          ...prevOrderData,
                          [id]: {
                            count: productCount,
                            productName: productName,
                            value: price * productCount,
                          },
                        };
                        return updatedOrderData;
                      });
                    }
                  }}
                >
                  +
                </Button>

                <Button
                  data-id={menu.id}
                  data-name={menu.productName}
                  data-price={menu.value}
                  onClick={(e) => {
                    const { dataset } = e.currentTarget as HTMLButtonElement;
                    const id = dataset.id;
                    const productName = dataset.name;
                    const price = Number(dataset.price);

                    if (!id) {
                      return;
                    }
                    setOrderData((prevOrderData) => {
                      const productCount =
                        prevOrderData[id]?.count > 0
                          ? prevOrderData[id]?.count - 1
                          : 0;

                      if (productCount === 0) {
                        const updatedOrderData = { ...prevOrderData };
                        delete updatedOrderData[id];
                        return updatedOrderData;
                      } else {
                        const updatedOrderData = {
                          ...prevOrderData,
                          [id]: {
                              count: productCount,
                              name: productName,
                              value: price * productCount,
                          },
                      };
                      

                        return updatedOrderData;
                      }
                    });
                    console.log(orderData);
                  }}
                >
                  -
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {Object.values(orderData).map((value, innerIndex) => (
        <p
          key={innerIndex}
        >{`${value?.productName} 個数：${value?.count} 個数：${value?.value}`}</p>
      ))}

      <SubmitForm orderData={orderData} />
    </div>
  );
}
