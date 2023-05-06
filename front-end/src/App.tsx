import "bootstrap/dist/css/bootstrap.min.css";
import appStyles from "./app.module.css";
import { Link } from "react-router-dom";
import { Tool } from "./components/AddItem";
import { useState, useEffect } from "react";
import axios from "axios";

const getTools = async () => {
  return axios.get("http://localhost:3001/inventories");
};

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Tool[]>([]);
  const [error, setError] = useState<string>("");

  const [trackedIndex, setTrackedIndex] = useState(20);
  const [toManipulate, setToManipulate] = useState<Tool[]>([]);

  const pagination = (leftOrRight: boolean) => {
    // false -> left
    // true -> right
    const defaultCounter = 20;

    if (leftOrRight) {
      if (trackedIndex > data.length) {
        console.log("Last");
        return "Last Page";
      }
      if (trackedIndex === data.length) {
        const leftOver = data.length - trackedIndex;
        setToManipulate([...data.slice(trackedIndex, trackedIndex + leftOver)]);
        setTrackedIndex((prev) => prev + leftOver);
      } else {
        setTrackedIndex((prev) => prev + defaultCounter);
        setToManipulate([
          ...data.slice(trackedIndex, trackedIndex + defaultCounter),
        ]);
      }
    } else {
      if (trackedIndex === 20) {
        console.log("Initial");
        return "Initial";
      }

      const from = trackedIndex - 2 * defaultCounter;
      const to = trackedIndex - defaultCounter;

      setTrackedIndex((prev) => prev - defaultCounter);
      setToManipulate([...data.slice(from, to)]);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    try {
      const inventoryData = async () => {
        const request = await getTools();
        const receivedData = request.data;
        setData(receivedData);
        setToManipulate([...data.slice(0, 20)]);
      };

      inventoryData();
    } catch (err) {
      setError(`${err}`);
    }

    return () => setIsLoading(false);
  }, []);

  console.log(data);
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
