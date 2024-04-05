import { useFetcher } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { orderDataType } from "@/utils/firebase/type/types";
import addData from "@/utils/firebase/addData";

function SubmitForm(param: { orderData: orderDataType }) {
  const fetcher = useFetcher();
  const { toast } = useToast();

  const data = param.orderData;

  const dataEmpty = (obj: orderDataType) => {
    return !(Object.entries(obj).length === 0 && obj.constructor === Object);
  };
  

  return (
    <fetcher.Form method="post">
      {dataEmpty(data) && (
        <>
          <Button
            variant="outline"
            type="submit"
            className="mt-4"
            onClick={(e) => {
              e.preventDefault();
              try {
                addData(data);
                toast({
                  title: "送信完了しました。",
                  description: "商品の到着までお待ち下さい",
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } catch (err) {
                throw new Error("エラーが発生致しました。");
              }
            }}
          >
            送信
          </Button>
        </>
      )}
      <Toaster />
    </fetcher.Form>
  );
}

export default SubmitForm;
