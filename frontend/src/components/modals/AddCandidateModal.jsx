import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../config/variables";

const Main = styled.div`
  font-size: 1.4rem;

  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 30%;
    background: ${colors.grey_050};

    .content {
      padding: 1rem;
    }

    .footer {
      background: ${colors.grey_100};
      display: flex;
      justify-content: flex-end;
      padding: 1rem;

      button {
        margin-right: 1rem;
        outline: none !important;
        border: none;
        background: transparent;
        font-size: 1.3rem;
        padding: 0.5rem;
        font-weight: bold;
      }

      .add {
        background: ${colors.cyan_600};
        border-radius: 0.2rem;
        color: ${colors.grey_050};

        :hover {
          background: ${colors.cyan_400};
          cursor: pointer;
        }
      }

      .close {
        background: ${colors.red_600};
        border-radius: 0.2rem;
        color: ${colors.grey_050};

        :hover {
          background: ${colors.red_400};
          cursor: pointer;
        }
      }
    }
  }

  .form {
    display: flex !important;
    flex-direction: column !important;

    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 2px solid ${colors.grey_100};
      background: ${colors.grey_050};
    }

    .invalid {
      color: ${colors.red_600};
      border-color: ${colors.red_600};
      outline: none;
    }
  }
`;

const AddCandidateModal = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [inputError, setInputError] = useState("");

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setEducation("");
    setInputError("");
  };

  const add = () => {
    if (!firstName) {
      setInputError("first");
      return;
    }

    if (!lastName) {
      setInputError("last");
      return;
    }

    if (!gender) {
      setInputError("gender");
      return;
    }

    if (!education) {
      setInputError("education");
      return;
    }

    const data = {
      firstName,
      lastName,
      gender,
      education,
      type: props.modal.type
    };

    props.addCandidate(data);
    props.closeModal();
    clearData()
  };

  if (!props.modal.open) return null;

  return (
    <Main>
      <div className="container">
        <div className="content">
          <h3>Add candidate</h3>
          <div className="form">
            <input
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className={inputError === "first" ? "invalid" : ""}
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className={inputError === "last" ? "invalid" : ""}
            />
            <input
              placeholder="Gender"
              value={gender}
              onChange={e => setGender(e.target.value)}
              className={inputError === "gender" ? "invalid" : ""}
            />
            <input
              placeholder="Education"
              value={education}
              onChange={e => setEducation(e.target.value)}
              className={inputError === "education" ? "invalid" : ""}
            />
          </div>
        </div>
        <div className="footer">
          <button className="add" onClick={add}>
            Add
          </button>
          <button className="close" onClick={() => {
            props.closeModal();
            clearData();
          }}>
            Close
          </button>
        </div>
      </div>
    </Main>
  );
};

export default AddCandidateModal;
