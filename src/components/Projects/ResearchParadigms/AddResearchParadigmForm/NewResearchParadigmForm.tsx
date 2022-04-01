import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useProjectStore } from '@app/stores/projectStore';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);

  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );
  const addResearchParadigm = useResearchParadigmsStore((state: any) => state.addResearchParadigm);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);

  useEffect(() => {
    const getData = async () => {
      const data = await getResearchParadigms(selectedProject);
    };
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addResearchParadigm(user?.id, title, link, selectedProject);
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
    </Container>
  );
});

export default Child;
