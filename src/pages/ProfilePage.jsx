import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";

export default function ProfilePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            // Redirect to login page after successful logout
            navigate("/login");
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <Container>
            <Row>
                <ProfileSideBar handleLogout={handleLogout} />
                <ProfileMidBody />
            </Row>
        </Container>
    );
}