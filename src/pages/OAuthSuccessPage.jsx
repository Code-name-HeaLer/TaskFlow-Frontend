// --- SIMPLER START OF FILE frontend/src/pages/OAuthSuccessPage.jsx ---
import { useEffect, useRef } from 'react'; // Added useRef
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen.jsx';

function OAuthSuccessPage() {
    const navigate = useNavigate();
    const { afterLoginSuccess, isAuthenticated, loading } = useAuth();
    const [searchParams] = useSearchParams();
    const effectRan = useRef(false); // To ensure effect logic runs once

    useEffect(() => {
        // Ensure this logic runs only once on mount
        if (effectRan.current || loading) { // Also wait if AuthContext is initially loading
            return;
        }
        effectRan.current = true;

        const oauthError = searchParams.get('error');
        if (oauthError) {
            console.error("OAuth Error from backend:", oauthError);
            navigate('/login?error=oauth_failed', { replace: true });
            return;
        }

        // Trigger AuthContext to re-fetch user data (which relies on the new cookie)
        afterLoginSuccess();
        // Navigation to /app will be handled by the effect below once isAuthenticated becomes true

    }, [afterLoginSuccess, navigate, searchParams, loading]); // `loading` from useAuth

    useEffect(() => {
        // This effect reacts to changes in authentication state
        if (!loading && isAuthenticated) {
            navigate('/app', { replace: true });
        } else if (!loading && !isAuthenticated && effectRan.current && !searchParams.get('error')) {
            // If the initial effect ran (attempted login) but we're still not authenticated and no explicit error
            // console.warn("OAuthSuccessPage: Authentication check completed, but user is not authenticated. Redirecting to login.");
            // This case needs careful handling to avoid loops if fetchUser immediately fails.
            // For now, let's assume if there's no error param and we are not authenticated after fetch, it's an issue.
            // Consider adding a small delay or a more robust error state from AuthContext if this causes issues.
            // navigate('/login?error=post_oauth_auth_failed', { replace: true });
        }
    }, [isAuthenticated, loading, navigate, searchParams]);

    return (
        <LoadingScreen message="Finalizing authentication, please wait..." />
    );
}
export default OAuthSuccessPage;