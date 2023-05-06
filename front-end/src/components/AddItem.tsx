import "bootstrap/dist/css/bootstrap.min.css";
import addItemStyles from "./addItem.module.css";
import { useState } from "react";
import axios from "axios";
export interface Tool {
  place: string;
  name: string;
  price: number;
}

const addItemToInventory = async (item: Tool) => {
  return axios.post("http://localhost:3001/inventories", item);
};

export const AddItem = () => {
  const [itemInfo, setItemInfo] = useState<Tool>({
    place: "მთავარი ოფისი",
    name: "",
    price: -1,
  });

  const [popUp, setPopUp] = useState<boolean>(false);
  const [requestInfo, setRequestInfo] = useState<string>("");

  const PopUpBox = ({ message }: { message: string }) => {
    return (
      <div className={addItemStyles["pop-up"]}>
        <img
          className={addItemStyles["tools-icon"]}
          src={"/tool-icon.svg"}
          draggable={false}
        />
        <p>{message}</p>
        <button
          type="button"
          className="btn btn-secondary"
          aria-label="Close"
          onClick={() => setPopUp((prev) => !prev)}
        >
          დახურვა
        </button>
      </div>
    );
  };

  const checker = async () => {
    if (
      itemInfo.name.trim().length === 0 ||
      itemInfo.price === -1 ||
      itemInfo.price.toString() === ""
    ) {
      setRequestInfo("არც ერთი ველი არ უნდა იყოს ცარიელი");
    } else {
      const request = await addItemToInventory(itemInfo);
      if (request.data === "OK") {
        setRequestInfo("ნივთი დაემატა წარმატებით!");
      } else {
        setRequestInfo("დაფიქსირდა შეცდომა, გთხოვთ, სცადოთ თავიდან!");
      }
    }

    setPopUp(true);
  };

  const blurStyle = {
    filter: "blur(5px)",
  };
  return (
    <>
      <div className={addItemStyles["box-wrapper"]}>
        <section
          className={addItemStyles["for-new-item"]}
          style={popUp ? blurStyle : {}}
        >
          <img
            className={addItemStyles["tools-icon"]}
            src={"/tool-icon.svg"}
            draggable={false}
          />
          <h5 className="fs-5">დაამატეთ სასურველი ნივთი</h5>
          <div className="d-flex flex-column gap-2">
            <div className="input-group mb-1">
              <label className="input-group-text">ადგილმდებარეობა</label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={(e) =>
                  setItemInfo({
                    ...itemInfo,
                    place: e.target.value,
                  })
                }
              >
                <option value="მთავარი ოფისი">მთავარი ოფისი</option>
                <option value="კავეა გალერია">კავეა გალერია</option>
                <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
                <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
                <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
              </select>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control h-50"
                id="floatingInput"
                placeholder="მაგ: ნივთ 1"
                defaultValue={itemInfo.name}
                onChange={(e) =>
                  setItemInfo({
                    ...itemInfo,
                    name: (e.target.value).trim(),
                  })
                }
              />
              <label>ნივთის სახელი</label>
            </div>

            <div className="form-floating ">
              <input
                type="number"
                min={0}
                className="form-control h-50"
                id="floatingPassword"
                placeholder="მაგ: 20"
                defaultValue={0}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setItemInfo({
                      ...itemInfo,
                      price: -1,
                    });
                  } else {
                    setItemInfo({
                      ...itemInfo,
                      price: Number(e.target.value),
                    });
                  }
                }}
              />
              <label>ნივთის ფასი(ლარებში)</label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            aria-label="Submit"
            onClick={() => checker()}
          >
            დამატება
          </button>
        </section>
      </div>
      {popUp && <PopUpBox message={requestInfo} />}
    </>
  );
};

export default AddItem;
