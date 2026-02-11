import Button from '../components/Button';

function Error404() {
    return (
        <div className='page container'>
            <p className="error-404">404</p>
            <h1>Sorry that page does not exist.</h1>
            <Button
            variant="secondary"
            width="auto"
            onClick={() => console.log("Go Home clicked")}
            >
            Go To Home
            </Button>
        </div>
    );
}

export default Error404