import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import AddItemDialog from "../Projects/AddItemDialog/AddItemDialog";
import NewArticleForm from "../Projects/Articles/AddArticleForm/NewArticleForm";

export default function AddButton(props: any) {
  const toast = useRef(null);
  const childCreateArticle = useRef();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const save = () => {
    setDisplayPrompt(true);
  };

  const notify = (name: string, description?: string) => {
    // @ts-ignore
    toast.current.show({
      severity: "success",
      summary: `${name} Created`,
      detail: `${description || ""}`,
      life: 3000,
    });
  };

  const addItem = async () => {
    // @ts-ignore
    await childCreateArticle.current.childAddArticle();
    setDisplayPrompt(false);
    notify(props.buttonLabel);
  };

  return (
    <>
      <Toast ref={toast} />
      <AddItemDialog
        setDisplayPrompt={setDisplayPrompt}
        displayPrompt={displayPrompt}
        header={props.buttonLabel}
        addFunction={addItem}
      >
        <NewArticleForm ref={childCreateArticle} />
      </AddItemDialog>
      <Button onClick={() => save()}>{props.header}</Button>
    </>
  );
}
