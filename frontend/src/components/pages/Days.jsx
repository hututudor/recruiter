import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import { colors } from "../../config/variables";
import * as daysActions from "../../utils/days";

const Main = styled.div`
  width: 80%;
  font-size: 1.3rem;

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

  table {
    margin-top: 1rem;
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    color: ${colors.grey_300};
  }

  thead td {
    border-bottom: 1px solid ${colors.grey_100};
  }

  tbody td {
    padding: 1rem 0;
    background: ${colors.grey_100};
  }

  tbody td:last-child {
    text-align: right;
  }

  tbody td:first-child {
    text-align: left;
    padding-left: 1rem;
  }

  .F td {
    background: ${colors.grey_200} !important;
  }

  .table-actions {
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
  const [days, setDays] = useState([]);

  const fetchData = async () => {
    try {
      const res = await daysActions.getAll();
      setDays(res.data.Items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <button onClick={() => { props.history.push('/days/add') }}>Add new</button>
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
              <tr key={day.id} className={day.type.charAt(0).toUpperCase()}>
                <td>{day.type.charAt(0).toUpperCase()}</td>
                <td>{new Date(day.date).toLocaleDateString("en-US")}</td>
                <td>{day.location}</td>
                <td>{day.owner}</td>
                <td>{new Date(day.date).getDate() === new Date().getDate() ? 'In progress' : 'Waiting'}</td>
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

export default withRouter(Days);
