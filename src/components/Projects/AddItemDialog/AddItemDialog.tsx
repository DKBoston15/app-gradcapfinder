import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Container } from "./styles";

export default function AddArticleDialog(props: any) {
  const onHide = () => {
    props.setDisplayPrompt(false);
  };

  const renderFooter = () => {
    return (
      <Container>
        <Button
          label="Create"
          icon="pi pi-times"
          onClick={() => props.addFunction()}
          autoFocus
          className="p-button-success p-button-sm"
        />
        <Button
          label="Cancel"
          icon="pi pi-check"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
      </Container>
    );
  };
  return (
    <>
      <Dialog
        header={props.header}
        visible={props.displayPrompt}
        style={{ width: "30vw" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        {props.children}
      </Dialog>
    </>
  );
}
