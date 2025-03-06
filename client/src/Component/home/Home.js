import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate=useNavigate();

  const handleClick =() =>{
    navigate("/tasks");
  }

  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1>Welcome to
        Your Task-Management-App</h1>
        <h5>Organize your tasks, stay productive,</h5>
        <h5>and accomplish your goals with our intuitive #1 app.</h5>
        <button className="home-btn p-2 m-1" onClick={handleClick}>Create Tasks</button>
      </div>
    </div>
  );
}

export default Home;
