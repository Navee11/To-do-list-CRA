import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [content, setContent] = useState("Submit");
  const [modal, setModal] = useState("");
  const [active, setActive] = useState(0);
  const [alert, setAlert] = useState(false);
  const [clear, setClear] = useState(false);
  const [empty, setEmpty] = useState(false);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [current, setCurrent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setEmpty(true);
      setModal("Please Enter The Value");
      // setContent(modal);
      // console.log(content);

      setTimeout(() => {
        setEmpty(false);
      }, 2000);
    } else if (content === "Submit") {
      setCurrent(true);
      setModal("Item Added To The List");

      setList([...list, text]);
    } else {
      list[active] = text;
      setCurrent(true);
      setContent("Submit");
    }
    setTimeout(() => {
      setCurrent(false);
    }, 1500);
    setText("");
  };
  const removeItem = (id) => {
    let newPeople = list.filter((item, index) => index !== id);
    setList(newPeople);
    setAlert(true);
    setModal("Item Removed");
    setTimeout(() => {
      setAlert(false);
    }, 1500);
  };
  const editItem = (id, value) => {
    inputRef.current.focus();
    setContent("edit");
    setText(value);
    setActive(id);
  };
  return (
    <>
      <div className="container">
        {current && <p className="isModal"> {modal}</p>}
        {alert && <p className="alert">{modal}</p>}
        {clear && <p className="alert">{modal}</p>}
        {empty && <p className="alert">{modal}</p>}
        <h3>Grocery Bud</h3>

        <form
          action=""
          onSubmit={(e) => {
            console.log(text);
            handleSubmit(e);
          }}
        >
          <div className="main-content">
            <input
              type="text"
              className="getInput"
              ref={inputRef}
              placeholder="Enter the items.."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button className="btn" type="submit" ref={btnRef}>
              {content}
            </button>
          </div>
        </form>
        <section className="list">
          {list.map((item, index) => {
            return (
              <div className="item" key={index} index={index}>
                <p className="item-name">{item}</p>
                <div>
                  <FaEdit
                    className="icon"
                    onClick={() => editItem(index, item)}
                  />
                  <MdDeleteForever
                    className="icon"
                    onClick={() => removeItem(index)}
                  />
                </div>
              </div>
            );
          })}
          {list.length !== 0 && (
            <p
              className="clear"
              onClick={() => {
                setList([]);
                setClear(true);
                setModal("Empty List");
                setTimeout(() => {
                  setClear(false);
                }, 1500);
              }}
            >
              Clear Items
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default App;
