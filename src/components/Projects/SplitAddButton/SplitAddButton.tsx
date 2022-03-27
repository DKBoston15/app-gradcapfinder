import { useState, useRef } from "react";
import { SplitButton } from "primereact/splitbutton";
import { confirmDialog } from "primereact/confirmDialog";
import AddItemDialog from "../AddItemDialog/AddItemDialog";
import NewArticleForm from "../Articles/AddArticleForm/NewArticleForm";
import { Toast } from "primereact/toast";

export default function SplitAddButton({
  selectedItem,
  deleteFunction,
  confirmMessage,
  confirmHeader,
  buttonLabel,
}: any) {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const childCreateArticle = useRef();
  const toast = useRef(null);

  const notify = (name: string, description?: string) => {
    // @ts-ignore
    toast.current.show({
      severity: "success",
      summary: `${name} Created`,
      detail: `${description || ""}`,
      life: 3000,
    });
  };

  const deleteHandler = async () => {
    await deleteFunction(selectedItem.id);
  };

  const confirm = () => {
    confirmDialog({
      message: confirmMessage,
      header: confirmHeader,
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteHandler(),
      reject: () => setDisplayPrompt(false),
    });
  };

  const items = [
    {
      label: confirmHeader,
      icon: "pi pi-times",
      command: () => {
        confirm();
      },
    },
  ];

  const save = () => {
    setDisplayPrompt(true);
  };

  const addItem = async () => {
    // @ts-ignore
    await childCreateArticle.current.childAddArticle();
    setDisplayPrompt(false);
    notify(buttonLabel);
  };

  return (
    <>
      <Toast ref={toast} />
      <AddItemDialog
        setDisplayPrompt={setDisplayPrompt}
        displayPrompt={displayPrompt}
        header={buttonLabel}
        addFunction={addItem}
      >
        <NewArticleForm ref={childCreateArticle} />
      </AddItemDialog>
      <SplitButton
        label={buttonLabel}
        icon="pi pi-plus"
        onClick={save}
        model={items}
        className="p-button-sm"
      ></SplitButton>
    </>
  );
}
