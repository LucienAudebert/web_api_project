import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
 
function Order(){
    
    // Behavior
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/');
    }

    // Display
    return (
        <div>
            <h1>
                This is the Order page.
            </h1>
            <Form/>
            <button onClick={handleClick}>Cancel</button>
        </div>
    );
};
 
export default Order;