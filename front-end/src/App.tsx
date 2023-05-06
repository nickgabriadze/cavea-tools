import "bootstrap/dist/css/bootstrap.min.css";
import appStyles from "./app.module.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const getTools = async () => {
  return axios.get("http://localhost:3001/inventories");
};

const deleteTool = async (id: number) => {
  await axios.delete(`http://localhost:3001/inventories/${id}`);
};

interface FetchedTools {
  id: number;
  itemName: string;
  itemLocation: string;
  itemPrice: number;
}

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<FetchedTools[]>([]);
  const [error, setError] = useState<string>("");
  const [referencedData, setReferencedData] = useState<FetchedTools[]>([]);
  const [trackedIndex, setTrackedIndex] = useState(20);
  const [toManipulate, setToManipulate] = useState<FetchedTools[]>([]);
  useEffect(() => {
    
    setToManipulate(referencedData.slice(0, 20));
  }, [referencedData]);

  const changeLocation = (value: number) => {
    const locations = [
      "ყველა",
      "მთავარი ოფისი",
      "კავეა გალერია",
      "კავეა თბილისი მოლი",
      "კავეა სითი მოლი",
      "კავეა ისთ ფოინთი",
    ];

    const location = locations[value];
    if (location === "ყველა") {
      setReferencedData(() => [...data]);
     
    } else {
      setReferencedData(() => [
        ...data.filter(
          (eachTool) => eachTool.itemLocation === locations[value]
        ),
      ]);
      
    }
 
  };

  const pagination = (leftOrRight: boolean) => {
    // false -> left
    // true -> right
    const defaultCounter = 20;

    if (leftOrRight) {
      if (trackedIndex > data.length) {
        return "Last Page";
      }
      if (trackedIndex === data.length) {
        const leftOver = data.length - trackedIndex;
        setToManipulate([
          ...referencedData.slice(trackedIndex, trackedIndex + leftOver),
        ]);
        setTrackedIndex((prev) => prev + leftOver);
      } else {
        setTrackedIndex((prev) => prev + defaultCounter);
        setToManipulate([
          ...referencedData.slice(trackedIndex, trackedIndex + defaultCounter),
        ]);
      }
    } else {
      if (trackedIndex === 20) {
        return "Initial Page";
      }

      const from = trackedIndex - 2 * defaultCounter;
      const to = trackedIndex - defaultCounter;

      setTrackedIndex((prev) => prev - defaultCounter);
      setToManipulate([...referencedData.slice(from, to)]);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    try {
      const inventoryData = async () => {
        const request = await getTools();
        const receivedData = request.data;
        setData(receivedData);
        setToManipulate(() => [...receivedData.slice(0, 20)]);
        setReferencedData(receivedData);
      };

      inventoryData();
    } catch (err) {
      setError(`${err}`);
    } finally {
      setIsLoading(false);
    }

    return () => abortController.abort();
  }, []);

  if (error) {
    alert("There was an error");
  }

  return (
    <div className={appStyles["items"]}>
      <div className={appStyles["new-tool-filter"]}>
        <Link to={"/add"}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            aria-label="Submit"
          >
            დაამატეთ ახალი ნივთი
          </button>
        </Link>

        <div className="">
          <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => changeLocation(Number(e.target.value))}
          >
            <option value="0">ყველა</option>
            <option value="1">მთავარი ოფისი</option>
            <option value="2">კავეა გალერია</option>
            <option value="3">კავეა თბილისი მოლი</option>
            <option value="4">კავეა სითი მოლი</option>
            <option value="5">კავეა ისთ ფოინთი</option>
          </select>
        </div>
      </div>

      {data.length === 0 ? (
        <h4 className={appStyles["data-loading"]}>Loading...</h4>
      ) : (
        <div className={appStyles["tool-table"]}>
          <div className={appStyles["desc"]}>
            <p>ნივთის სახელი</p>
            <p>ნივთის ადგილმდებარეობა</p>
            <p>ფასი</p>
            <p>ოპერაციები</p>
          </div>

          <div className={appStyles["tools-grid"]}>
            {toManipulate.map((eachTool) => (
              <div key={eachTool.id} className={appStyles["each-tool"]}>
                <div style={{ width: "100px" }}>{eachTool.itemName}</div>
                <div style={{ width: "200px" }}>{eachTool.itemLocation}</div>
                <div>{eachTool.itemPrice}₾</div>
                <button
                  onClick={() => {
                    setToManipulate((prev) => [
                      ...prev.filter((each) => each.id !== eachTool.id),
                    ]);
                    setData((prev) => [
                      ...prev.filter((each) => each.id !== eachTool.id),
                    ]);

                    deleteTool(eachTool.id);
                  }}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  წაშლა
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={appStyles["buttons"]}>
        <button
          onClick={() => pagination(false)}
          type="button"
          className="btn btn-primary btn-sm"
        >
          <img src={"/move-left-icon.svg"} />
        </button>
        <button
          onClick={() => pagination(true)}
          type="button"
          className="btn btn-primary btn-sm"
        >
          <img src={"/move-right-icon.svg"} />
        </button>
      </div>
    </div>
  );
};
export default App;
