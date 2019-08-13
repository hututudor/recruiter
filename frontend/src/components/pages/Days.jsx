import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import { colors } from "../../config/variables";
import * as daysActions from "../../utils/days";
import getCurrentDate from "../../utils/date";

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
    color: ${colors.indigo_700};

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
    font-weight: bold;

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
    font-weight: bold;

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
  const [time, setTime] = useState(1);
  const [type, setType] = useState('all');

  const fetchData = async () => {
    console.log(getCurrentDate().getTime());

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

  const changeTime = n => {
    if(time === n) setTime(0);
    else setTime(n);
  };

  const filteredDays = () => {
    return days.filter(day => {
      if(type === 'all') return day;
      if(type === 'full' && day.type.charAt(0).toLowerCase() === 'f') return day;
      if(type === 'intern' && day.type.charAt(0).toLowerCase() === 'i') return day;
    }).filter(day => {
      if(time === 0) return day;
      if(time === -1 && new Date(day.date).getTime() > getCurrentDate().getTime()) return day;
      if(time === 1 && new Date(day.date).getTime() < getCurrentDate().getTime()) return day;
    });
  };

  return (
    <Main>
      <div className="actions">
        <div className="date-filter">
          <button className={time === -1 ? 'active' : ''} onClick={() => changeTime(-1)}>Upcoming days</button>
          <button className={time === 1 ? 'active' : ''} onClick={() => changeTime(1)}>Passed days</button>
        </div>
        <div className="bar">
          <span className="left">
            <button className={type === 'all' ? 'active' : ''} onClick={() => setType('all')}>All</button>
            <button className={type === 'full' ? 'active' : ''} onClick={() => setType('full')}>Full-time</button>
            <button className={type === 'intern' ? 'active' : ''} onClick={() => setType('intern')}>Intern</button>
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
            {filteredDays().map(day => (
              <tr key={day.id} className={day.type.charAt(0).toUpperCase()}>
                <td>{day.type.charAt(0).toUpperCase()}</td>
                <td>{new Date(day.date).toLocaleDateString("en-US")}</td>
                <td>{day.location}</td>
                <td>{day.owner}</td>
                <td>{new Date(day.date).getTime() === getCurrentDate().getTime() ? 'In progress' : new Date(day.date).getTime() > getCurrentDate().getTime() ? 'Waiting' : '-'}</td>
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
