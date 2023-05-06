import "bootstrap/dist/css/bootstrap.min.css";
import addItemStyles from "./addItem.module.css";
import { useState } from "react";

export const AddItem = () => {
  const [itemInfo, setItemInfo] = useState<{
    place: string;
    name: string;
    price: number;
  }>({ place: "მთავარი ოფისი", name: "", price: 0 });


  
  return (
    <section className={addItemStyles["for-new-item"]}>
      
      <img
        className={addItemStyles["tools-icon"]}
        src={"/public/tool-icon.svg"}
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
                name: e.target.value,
              })
            }
          />
          <label>ნივთის სახელი</label>
        </div>

        <div className="form-floating ">
          <input
            type="number"
            className="form-control h-50"
            id="floatingPassword"
            placeholder="მაგ: 20"
            defaultValue={0}
            onChange={(e) =>
              setItemInfo({
                ...itemInfo,
                price: Number(e.target.value),
              })
            }
          />
          <label>ნივთის ფასი(ლარებში)</label>
        </div>
      </div>
      <button type="button" className="btn btn-primary" aria-label="Close">
        დამატება
      </button>
    </section>
  );
};

export default AddItem;
