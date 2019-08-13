import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { colors } from "../../config/variables";
import * as daysActions from '../../utils/days'
import getCurrentDate from "../../utils/date";

const Main = styled.div`
  margin-top: 1rem;
  font-size: 1.3rem;
  width: 80%;
  
  .actions { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem !important;
    border-bottom: 2px solid ${colors.grey_200};
    
    button {
      width: 10rem;
      margin-left: 1rem;
      height: 3rem;
      outline: none !important;
      border: none;
      background: transparent;
      font-weight: bold;
      
      :nth-child(1) {
        color: ${colors.indigo_700}
        text-transform: uppercase;
        
        :hover {
          background: ${colors.grey_100}
        }
      }
      
      :nth-child(2) {
        color: ${colors.grey_900};
        border: 2px solid ${colors.grey_900}
        
        :hover {
          background: ${colors.grey_100}
        }
      }
      
      :nth-child(3) {
        color: ${colors.grey_050};
        background: ${colors.grey_900};
        
        :hover {
          background: ${colors.grey_700}
        }
      }
      
      :hover {
        cursor: pointer;
      }
    }
  }
  
  .form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    
    span {
      flex-grow: 1;
    }
    
    span:nth-child(1) {
      flex-grow: 1;
      button {
        width: 50%;
        outline: none !important;
        border: none;
        background: ${colors.grey_100};
        padding: 1rem;
        cursor: pointer;
        transition: all .1s;
      }
      
      .active {
        color: ${colors.grey_050};
        background: ${colors.indigo_700};
      }
    }
    
    span:nth-child(2), span:nth-child(3) {
      margin-left: 1rem;
      height: 100%;
      
      input {
        outline: none !important;
        border: 2px solid ${colors.grey_100};
        width: 100%;
        height: 100%;
        padding: .9rem;
        background: ${colors.grey_050};
      }
      
      .invalid {
        color: ${colors.red_600};
        border-color: ${colors.red_600};
      }
    }
    
    span:nth-child(4) {
      margin-left: 1rem;

      select {
        outline: none !important;
        border: 2px solid ${colors.grey_100};
        width: 100%;
        height: 100%;
        padding: .9rem;
        background: ${colors.grey_050};
      }
    }
    
    span:last-child {
      flex-grow: 2;
      text-align: center;
      margin-left: 1rem;
      border: 2px dashed ${colors.grey_100};
      padding: .7rem;
    }
  }
  
  .candidates {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    button {
      padding-left: 1rem;
      padding-right: 1rem;
      outline: none !important;
      background: transparent;
      color: ${colors.grey_900};
      font-weight: bold;
      border: 2px solid ${colors.indigo_900};
    }
  }
`;

const DaysAdd = props => {
  const [type, setType] = useState('intern');
  const [owner, setOwner] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Berlin');
  const [disabled, setDisabled] = useState(false);
  const [inputError, setInputError] = useState('');

  const submit = async () => {
    try {
      if(disabled) throw new Error('Disabled');
      setDisabled(true);
      setInputError('');
      if (type !== 'intern' && type !== 'full-time') throw new Error('Type');
      if (!owner || owner.length < 3) {
        setInputError('owner');
        throw new Error('Owner');
      }
      if (!date || new Date(date).getTime() < getCurrentDate().getTime()) {
        setInputError('time');
        throw new Error('Time');
      }
      if (!location) throw new Error('Location');

      const res = await daysActions.add({
        type,
        owner,
        date,
        location
      });

      props.history.push('/days');
    } catch (e) {
      console.error(e);
    }
    setDisabled(false);
  };

  return (
    <Main>
      <div className="actions">
        <h1>Add Recruiting Day</h1>
        <span>
          <button onClick={() => props.history.push('/days')}>Back</button>
          <button onClick={() => submit()}>Save</button>
          <button>Publish</button>
        </span>
      </div>
      <div className="form">
        <span>
          <button className={type === 'intern' ? 'active' : ''} onClick={() => setType('intern')}>Intern</button>
          <button className={type === 'full-time' ? 'active' : ''} onClick={() => setType('full-time')}>Full-time</button>
        </span>
        <span>
          <input type="text" placeholder="Owner name" className={inputError === 'owner' ? 'invalid' : ''} value={owner} onChange={e => setOwner(e.target.value)}/>
        </span>
        <span>
          <input type="text" placeholder="Date" className={inputError === 'time' ? 'invalid' : ''} value={date} onChange={e => setDate(e.target.value)} />
        </span>
        <span>
          <select value={location} onChange={e => setLocation(e.target.value)} placeholder="Location">
            <option value="Berlin">Berlin</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="Koln">Koln</option>
            <option value="Essen">Essen</option>
          </select>
        </span>
        <span>Upload candidate profiles</span>
      </div>
      <div className="candidates">
        <h2>Morning</h2>
        <button>Add candidate</button>
      </div>
      <div className="candidates">
        <h2>Afternoon</h2>
        <button>Add candidate</button>
      </div>
    </Main>
  );
};

export default withRouter(DaysAdd);
