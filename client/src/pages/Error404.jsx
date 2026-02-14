import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Error404() {
    const navigate = useNavigate();

    return (
        <div className='page container'>
            <p className="error-404">404</p>
            <h1>Oops! The page you’re looking for doesn’t exist.</h1>
            <Button
            variant="secondary"
            width="auto"
            onClick={() => navigate('/')}
            >
            Go To Home
            </Button>
        </div>
    );
}

export default Error404