import { Link } from 'react-router-dom';
import { Container, Icon, LinkContainer, Button } from './styles';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../../stores/profileStore';

export default function MainNavBar() {
  const profile = useProfileStore((state: any) => state.profile);
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      {profile && (
        <Container>
          <LinkContainer>
            <Link to="/dashboard">
              <Icon className="pi pi-th-large" />
            </Link>
            <Link to="/tasks">
              <Icon className="pi pi-check-square" />
            </Link>
            <Link to="/projects">
              <Icon className="pi pi-folder-open" />
            </Link>
            <Link to="/people">
              <Icon className="pi pi-users" />
            </Link>
            <Link to="/learn">
              <Icon className="pi pi-book" />
            </Link>
            <Link to="/chat">
              <Icon className="pi pi-comments" />
            </Link>
            <Link to="/settings">
              <Icon className="pi pi-cog" />
            </Link>
            {profile.role === 0 && (
              <Link to="/admin">
                <Icon className="pi pi-server" />
              </Link>
            )}
          </LinkContainer>
          <Button
            onClick={async () => {
              signOut();
            }}
          >
            Logout
          </Button>
        </Container>
      )}
    </>
  );
}
