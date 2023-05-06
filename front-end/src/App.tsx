import "bootstrap/dist/css/bootstrap.min.css";
import appStyles from "./app.module.css";
import { Link } from "react-router-dom";
import { Tool } from "./components/AddItem";
import { useState, useEffect } from "react";
import axios from "axios";

const getTools =  async () => {
  return axios.get("http://localhost:3001/inventories");
}

export const App = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Tool[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setIsLoading(true);

    try{
      const inventoryData = async () => {
        const request = await getTools();
        const receivedData = request.data;
        setData(receivedData)
      }

      inventoryData();
    }catch(err) {
      setError(`${err}`)
    }
   

    return () => setIsLoading(false)
}, [])


  console.log(data)
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
