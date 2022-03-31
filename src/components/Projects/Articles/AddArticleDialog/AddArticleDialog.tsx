import { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import NewArticleForm from '../AddArticleForm/NewArticleForm';
import { Toast } from 'primereact/toast';

interface AddArticleDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
}

export default function AddArticleDialog({
  displayPrompt,
  setDisplayPrompt,
}: AddArticleDialogProps) {
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const childCreateArticle = useRef();
  const notify = (name: string, description: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Created`,
      detail: `${description}`,
      life: 3000,
    });
  };

  const addArticle = async () => {
    // @ts-ignore
    await childCreateArticle.current.childAddArticle();
    setDisplayPrompt(false);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Create"
          icon="pi pi-times"
          onClick={() => addArticle()}
          autoFocus
          className="p-button-success p-button-sm"
        />
        <Button
          label="Cancel"
          icon="pi pi-check"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="New Article"
        visible={displayPrompt}
        style={{ width: '30vw' }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <NewArticleForm ref={childCreateArticle} />
      </Dialog>
    </>
  );
}
