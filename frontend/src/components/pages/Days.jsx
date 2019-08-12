import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../config/variables";

const Main = styled.div`
  width: 70%;
  font-size: 1.8rem;

  .actions .date-filter {
    border-bottom: 1px solid ${colors.grey_900};
    padding-bottom: 0;
    font-size: 2.5rem;
  }

  .actions .date-filter button {
    outline: none !important;
    border: none;
    background: transparent;
    margin-right: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;

    ::after {
      display: block;
      content: "";
      padding-top: 9px;
      border-bottom: 3px solid ${colors.grey_050};
    }

    :hover {
      color: ${colors.indigo_700};
      ::after {
        display: block;
        content: "";
        padding-top: 9px;
        border-bottom: 3px solid ${colors.indigo_700};
      }
    }
  }

  .actions .date-filter button.active {
    ::after {
      display: block;
      content: "";
      padding-top: 9px;
      border-bottom: 3px solid ${colors.indigo_700};
    }
  }

  .bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
    fonxt-size: 2.5rem;
  }

  .bar .left button {
    width: 10rem;
    height: 3rem;
    outline: none !important;
    border: none;
    background: ${colors.grey_100};
    margin-right: 0.2rem;
    transition: all 0.1s;
    cursor: pointer;

    :hover {
      background: ${colors.indigo_700};
      color: ${colors.grey_050};
    }
  }

  .bar .left button.active {
    background: ${colors.indigo_700};
    color: ${colors.grey_050};
  }

  .bar .right button {
    width: 10rem;
    height: 3rem;
    outline: none !important;
    border: none;
    background: ${colors.grey_900};
    color: ${colors.grey_050};
    margin-right: 0.2rem;
    transition: all 0.1s;
    cursor: pointer;

    :hover {
      background: ${colors.grey_700};
      color: ${colors.grey_100};
    }
  }

  .table table {
    margin-top: 1rem;
    width: 100%;
  }

  .table table thead {
    color: ${colors.grey_300};
  }

  .table .table-actions {
    margin: auto;
  }

  .table button {
    outline: none;
    border: none;
    background: transparent;
    margin-right: 1rem;
    color: ${colors.indigo_900};
    text-transform: uppercase;
    transition: all 0.2s;

    :hover {
      cursor: pointer;
    }
  }
`;

const Days = props => {
  const [days, setDays] = useState([
    {
      id: "1212",
      type: "Intern",
      location: "Berlin",
      owner: "Tudor Hutu",
      date: "2019-09-14T01:00:00+01:00"
    },
    {
      id: "1213",
      type: "Full-time",
      location: "Munchen",
      owner: "Tudor Hutu",
      date: "2019-09-14T01:00:00+01:00"
    },
    {
      id: "1214",
      type: "Intern",
      location: "Dusseldorf",
      owner: "Tudor Hutu",
      date: "2019-09-14T01:00:00+01:00"
    }
  ]);

  return (
    <Main>
      <div className="actions">
        <div className="date-filter">
          <button className="active">Upcoming days</button>
          <button className="">Passed days</button>
        </div>
        <div className="bar">
          <span className="left">
            <button className="active">All</button>
            <button className="">Full-time</button>
            <button className="">Intern</button>
          </span>

          <span className="right">
            <button>Add new</button>
          </span>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>Type</td>
              <td>Date</td>
              <td>Location</td>
              <td>Owner</td>
              <td>Status</td>
              <td className="table-actions" />
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr>
                <td className="circle">{day.type.charAt(0).toUpperCase()}</td>
                <td>{new Date(day.date).toLocaleDateString("en-US")}</td>
                <td>{day.location}</td>
                <td>{day.owner}</td>
                <td>In progress</td>
                <td>
                  <button className="table-button">Details</button>
                  <button className="table-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Main>
  );
};

export default Days;
