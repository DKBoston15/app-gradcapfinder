import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
} from "./styles";
import { supabase } from "@app/supabase/index";
import { useProjectStore } from "@app/stores/projectStore";
import { useJournalStore } from "@app/stores/journalStore";
import { Checkbox } from "primereact/checkbox";

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [primary, setPrimary] = useState(null);
  const [primaryCount, setPrimaryCount] = useState(0);

  const getJournals = useJournalStore((state: any) => state.getJournals);
  const addJournal = useJournalStore((state: any) => state.addJournal);
  const selectedProject = useProjectStore(
    (state: any) => state.selectedProject
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getJournals(selectedProject);
      let extractedValue = data.map((item) => item.primary);
      let count = 0;
      for (
        let primaryValue = 0;
        primaryValue < extractedValue.length;
        primaryValue++
      ) {
        if (extractedValue[primaryValue]) {
          count++;
        }
      }
      setPrimaryCount(count);
    };
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addJournal(
        user?.id,
        title,
        link,
        props.connectedEntity,
        primary,
        selectedProject
      );
    },
  }));

  return (
    <Container>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <CheckboxContainer className="field-checkbox">
        <Checkbox
          disabled={primaryCount >= 7 ? true : false}
          tooltip="This project already has a max of 7 journals set as a primary journal"
          tooltipOptions={{ disabled: primaryCount >= 7 ? false : true }}
          inputId="primary"
          checked={primary}
          onChange={(e) => setPrimary(e.checked)}
        />
        <CheckboxLabel htmlFor="primary">Primary Journal?</CheckboxLabel>
      </CheckboxContainer>
    </Container>
  );
});

export default Child;
