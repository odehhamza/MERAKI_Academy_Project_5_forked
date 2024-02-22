import React, { useEffect, useRef, useState } from "react";
import "./UserPrivate.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../Redux/Reducers/CoachPrivate/index";
const CoachPrivate = () => {
  const revarse =useRef(null)
  if(revarse.current){
    revarse.current.scrollTop= revarse.current.scrollHeight
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo=localStorage.getItem("userInfo")
  const covertUserInfoToJson = JSON.parse(userInfo);
  const { token, userId, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      users: state.coachPrivate.users,
    };
  });
  const [header, setHeader] = useState("");
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [filtered, setFiltered] = useState([]);
  const removeUserFromPrivate = (user_id, coach_id) => {
    axios
      .put(
        `http://localhost:5000/coachs/user/remove`,
        { user_id: user_id, coach_id: coach_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllUsers = () => {
    axios
      .get(`http://localhost:5000/coachs/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.success);
        if (result.data.success) {
          result.data.users.map((ele, i) => {
            if (new Date() >= new Date(ele.endsub)) {
              removeUserFromPrivate(ele.user_id, ele.coach_id);
            }
          });
          const newUserArr = result.data.users.filter(
            (ele, i) => new Date() < new Date(ele.endsub)
          );
          dispatch(setUsers(newUserArr));
          setFiltered(newUserArr);
          setSuccess(result.data.success)
        }else{
          setSuccess(result.data.success)
          setMessage(result.data.message)
        }
      })
      .catch((error) => {
        setSuccess(false)
              setMessage(error.response.data.message)
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  let messages = [
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.iterature from 45 BC, making it over 2000 years old.",
    },
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      name: "Mohammed Odat",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.111",
    },
  ];
  return (
    <div className="Coach-Private-Page">
      <div className="Left-Side">
        {success?<div className="User-List">
          {filtered.map((user, i) => (
            <div
              className="User-Name"
              onClick={() => {
                setHeader(`${user.firstname} ${user.lastname}`);
              }}
            >
              <>
                {user.name === "Lite"
                  ? "🐱"
                  : user.name === "Gold"
                  ? "🦁"
                  : user.name === "Premium" && "👑"}
              </>{" "}
              {user.firstname} {user.lastname}
            </div>
          ))}
        </div>:<span  style={{backgroundColor:"red" ,width:"90%",
        fontSize:"x-large",borderRadius:"8px"}}>{message}</span>
          
        }
        
        <div className="My-Private">
          <div className="img-title">
            <div className="Private-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="white"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </div>
            <div className="Private-Title">{covertUserInfoToJson.nameUser}</div>
          </div>

          <svg
          onClick={()=>{
            navigate('/home')
          }}
            className="icon"
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="red"
            class="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </div>
      </div>
      <div className="Right-Side">
        <div className="Header">{header}</div>
        <div ref={revarse} className="message">
          {messages.map((ele, i) => (
            <div className="msg">
              <div className="user-pic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div className="user-message">
                <p>{ele.name}</p>
                <p>{ele.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="Input-Button">
          <div className="Input">
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </div>
          <div className="Buttons">
            <div className="left">
              <Button>Image</Button>
              <Button>Video</Button>
              <Button>File</Button>
            </div>
            <div className="right">
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPrivate;
