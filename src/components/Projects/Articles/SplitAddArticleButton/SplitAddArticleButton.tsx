import { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { confirmDialog } from "primereact/confirmDialog";
import AddArticleDialog from "../AddArticleDialog/AddArticleDialog";
import { useArticleStore } from "@app/stores/articleStore";

export default function SplitAddArticleButton({ selectedArticle }: any) {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const deleteArticle = useArticleStore((state: any) => state.deleteArticle);
  const deleteArticleHandler = async () => {
    await deleteArticle(selectedArticle.id);
  };

  const confirm = () => {
    confirmDialog({
      message: `Are you sure you want to delete ${selectedArticle.title}?`,
      header: "Delete Article",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteArticleHandler(),
      reject: () => setDisplayPrompt(false),
    });
  };

  const items = [
    {
      label: "Delete Article",
      icon: "pi pi-times",
      command: () => {
        confirm();
      },
    },
  ];

  const save = () => {
    setDisplayPrompt(true);
  };

  return (
    <>
      <AddArticleDialog
        setDisplayPrompt={setDisplayPrompt}
        displayPrompt={displayPrompt}
      />
      <SplitButton
        label="New Article"
        icon="pi pi-plus"
        onClick={save}
        model={items}
        className="p-button-sm"
      ></SplitButton>
    </>
  );
}
