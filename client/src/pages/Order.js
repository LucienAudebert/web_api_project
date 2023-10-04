//https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import { useNavigate } from 'react-router-dom';
 
function Order(){

    const navigate = useNavigate();


    // Behavior
    const handleClick = () => {
      navigate('/');
    }


    // Display
    return (
        <div>
            <h1>
                This is the Order page.
            </h1>
            <button onClick={handleClick}>Cancel</button>
        </div>
    );
};
 
export default Order;