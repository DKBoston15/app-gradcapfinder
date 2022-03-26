import { Container } from "../styles/globalPage.styles";
import ThemeSelector from "../components/ThemeSelector/ThemeSelector";
import Layout from "../layouts/Layout";

export default function Settings() {
  return (
    <Layout>
      <Container>
        Settings
        <ThemeSelector />
      </Container>
    </Layout>
  );
}
