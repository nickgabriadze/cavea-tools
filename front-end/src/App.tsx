import "bootstrap/dist/css/bootstrap.min.css";
import appStyles from "./app.module.css";
import { Link } from "react-router-dom";

export const App = () => {
  return (
    <div className={appStyles["items"]}>
      <Link to={"/add"}>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          aria-label="Submit"
        >
          დაამატეთ ახალი ნივთი
        </button>
      </Link>
      
    </div>
  );
};

export default App;
