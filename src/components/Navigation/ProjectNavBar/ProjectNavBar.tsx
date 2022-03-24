import { useEffect } from "react";
import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  CustomDropdown,
} from "./styles";
import { useProjectStore } from "@app/stores/projectStore";
import { DropdownProject } from "@app/types/index";

export default function ProjectNavBar() {
  const dropdownProjects = useProjectStore(
    (state: any) => state.dropdownProjects
  );
  const selectedProject = useProjectStore(
    (state: any) => state.selectedProject
  );
  const setSelectedProject = useProjectStore(
    (state: any) => state.setSelectedProject
  );
  useEffect(() => {
    if (dropdownProjects[0] && !selectedProject) {
      setSelectedProject(dropdownProjects[0].value, dropdownProjects[0].label);
    }
  }, [dropdownProjects]);
  return (
    <Container>
      {dropdownProjects && (
        <>
          <SubNavHeader>Projects</SubNavHeader>
          <CustomDropdown
            options={dropdownProjects}
            value={selectedProject}
            onChange={(e) => {
              const scopedSelectedProject = dropdownProjects.filter(
                (project: DropdownProject) => project.value === e.value
              );
              setSelectedProject(
                scopedSelectedProject[0].value,
                scopedSelectedProject[0].label
              );
            }}
          />
          <NavList>
            <NavLink to="/projects/overview">Overview</NavLink>
            <NavLink to="/projects/analytic_designs">Analytic Designs</NavLink>
            <NavLink to="/projects/analysis_techniques">
              Analysis Techniques
            </NavLink>
            <NavLink to="/projects/articles">Articles</NavLink>
            <NavLink to="/projects/authors">Authors</NavLink>
            <NavLink to="/projects/figures">Figures</NavLink>
            <NavLink to="/projects/journals">Journals</NavLink>
            <NavLink to="/projects/key_terms">Key Terms</NavLink>
            <NavLink to="/projects/labs">Labs</NavLink>
            <NavLink to="/projects/models">Models</NavLink>
            <NavLink to="/projects/research_paradigms">
              Research Paradigms
            </NavLink>
            <NavLink to="/projects/research_questions">
              Research Questions
            </NavLink>
            <NavLink to="/projects/sampling_designs">Sampling Designs</NavLink>
            <NavLink to="/projects/sampling_techniques">
              Sampling Techniques
            </NavLink>
            <NavLink to="/projects/tables">Tables</NavLink>
          </NavList>
        </>
      )}
    </Container>
  );
}
