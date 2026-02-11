import Button from '../components/Button';

function Error404() {
    return (
        <div className='page container'>
            <h1>Sorry this page does not exist.</h1>
            <Button
            variant="danger"
            width="auto"
            onClick={() => console.log("Go Home clicked")}
            >
            Go To Home
            </Button>
        </div>
    );
}

export default Error404