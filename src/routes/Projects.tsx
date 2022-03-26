import { useEffect } from "react";
import { Container } from "../styles/globalPage.styles";
import Layout from "../layouts/Layout";
import ProjectNavBar from "..//components/Navigation/ProjectNavBar/ProjectNavBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Overview from "./ProjectRoutes/Overview";
import AnalyticDesigns from "./ProjectRoutes/AnalyticDesigns";
import AnalysisTechniques from "./ProjectRoutes/AnalysisTechniques";
import Articles from "./ProjectRoutes/Articles";
import Authors from "./ProjectRoutes/Authors";
import Figures from "./ProjectRoutes/Figures";
import Journals from "./ProjectRoutes/Journals";
import KeyTerms from "./ProjectRoutes/KeyTerms";
import Labs from "./ProjectRoutes/Labs";
import Models from "./ProjectRoutes/Models";
import ResearchParadigms from "./ProjectRoutes/ResearchParadigms";
import ResearchQuestions from "./ProjectRoutes/ResearchQuestions";
import Tables from "./ProjectRoutes/Tables";
import SamplingDesigns from "./ProjectRoutes/SamplingDesigns";
import SamplingTechniques from "./ProjectRoutes/SamplingTechniques";
import { useProjectStore } from "@app/stores/projectStore";
import { useArticleStore } from "@app/stores/articleStore";
import { supabase } from "@app/supabase";

export default function Projects() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const location = useLocation();
  const navigate = useNavigate();
  const user = supabase.auth.user();

  useEffect(() => {
    const getProjectData = async () => {
      await getProjects();
    };
    getProjectData();
    if (location.pathname === "/projects") navigate("/projects/overview");
  }, []);

  useEffect(() => {
    getProjects();
    const realtimeProfileUpdates = supabase
      .from("projects")
      .on("*", (payload) => {
        getProjects(user?.id);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    getProjects();
    const realtimeProfileUpdates = supabase
      .from("articles")
      .on("*", (payload) => {
        getArticles(user?.id);
      })
      .subscribe();
  }, []);

  const SubPage = () => {
    if (location.pathname === "/projects") return <Overview />;
    if (location.pathname === "/projects/overview") return <Overview />;
    if (location.pathname === "/projects/analytic_designs")
      return <AnalyticDesigns />;
    if (location.pathname === "/projects/analysis_techniques")
      return <AnalysisTechniques />;
    if (location.pathname.includes("/projects/articles")) return <Articles />;
    if (location.pathname === "/projects/authors") return <Authors />;
    if (location.pathname === "/projects/figures") return <Figures />;
    if (location.pathname === "/projects/journals") return <Journals />;
    if (location.pathname === "/projects/key_terms") return <KeyTerms />;
    if (location.pathname === "/projects/labs") return <Labs />;
    if (location.pathname === "/projects/models") return <Models />;
    if (location.pathname === "/projects/research_paradigms")
      return <ResearchParadigms />;
    if (location.pathname === "/projects/research_questions")
      return <ResearchQuestions />;
    if (location.pathname === "/projects/tables") return <Tables />;
    if (location.pathname === "/projects/sampling_designs")
      return <SamplingDesigns />;
    if (location.pathname === "/projects/sampling_techniques")
      return <SamplingTechniques />;
    return <div>No Path</div>;
  };

  return (
    <Layout>
      <ProjectNavBar />
      <Container>
        <SubPage />
      </Container>
    </Layout>
  );
}
