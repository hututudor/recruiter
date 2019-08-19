import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Flex, Input, Dropdown, Space, Icon } from '@kogaio';

import AddCandidateModal from './AddCandidateModal';
import CandidateTable from './CandidateTable';
import useDate from '@shared/hooks/useDate';
import daysService from '@days/services/days';

const Wrapper = styled.div`
  width: 80%;
  margin-top: 1rem;

  .buttons {
    border-bottom: 2px solid #dee0e3;
    padding-bottom: 1rem;

    button {
      margin-left: 1rem;
    }
  }

  .form {
    margin-top: 1rem;

    .upload {
      border: 1px dashed black;
      text-align: center;
    }

    input {
      margin-right: 1rem;
    }

    span {
      flex-grow: 1;
    }

    span:not(:last-child) {
      margin-right: 1rem;
    }
  }

  .candidates {
    margin-bottom: 1rem;
  }
`;

const options = [
  {
    id: 1,
    label: 'Berlin'
  },
  {
    id: 2,
    label: 'Frankfurt'
  },
  {
    id: 3,
    label: 'Koln'
  },
  {
    id: 4,
    label: 'Essen'
  }
];

const AddDay = props => {
  const [type, setType] = useState('intern');
  const [owner, setOwner] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Berlin');
  const [disabled, setDisabled] = useState(false);
  const [inputError, setInputError] = useState('');
  const [modal, setModal] = useState({ open: false });
  const [candidates, setCandidates] = useState([]);

  const currentDate = useDate();

  const addCandidate = candidate => {
    setCandidates([...candidates, candidate]);
  };

  const deleteCandidate = candidate => {
    const index = candidates.indexOf(candidate);

    if (index === -1) return;

    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);

    setCandidates(newCandidates);
  };

  const onSubmit = async () => {
    try {
      if (disabled) throw new Error('Disabled');
      setDisabled(true);
      setInputError('');
      if (type !== 'intern' && type !== 'fulltime') throw new Error('Type');
      if (!owner) {
        setInputError('owner');
        throw new Error('Owner');
      }
      if (!date || new Date(date).getTime() < currentDate.getTime()) {
        setInputError('date');
        throw new Error('Time');
      }
      if (!location) {
        throw new Error('Location');
      }

      const res = await daysService.add({
        type,
        owner,
        date,
        location,
        candidates
      });

      props.history.push('/');
    } catch (e) {
      console.error(e);
    }

    setDisabled(false);
  };

  return (
    <Fragment>
      <AddCandidateModal
        isShown={modal.open}
        hideModal={() => setModal({ open: false })}
        add={addCandidate}
        type={modal.type}
      />
      <Wrapper>
        <div className="buttons">
          <Flex justifyContent="space-between">
            <span>
              <Typography variant="h1" fontWeight="bold">
                Add recruitment day
              </Typography>
            </span>
            <span>
              <Flex flexDirection="row">
                <Button
                  title="Back"
                  variant="primary"
                  colors="simple-button"
                  onClick={() => props.history.push('/')}
                />
                <Button
                  title="Save"
                  variant="outline"
                  colors="outline-button"
                  disabled={disabled}
                  onClick={onSubmit}
                />
                <Button
                  title="Publish"
                  variant="primary"
                  colors="button-action"
                />
              </Flex>
            </span>
          </Flex>
        </div>
        <div className="form">
          <Space mb={4}>
            <Flex justifyContent="space-between">
              <Flex flexGrow={1}>
                <Button
                  title="Intern"
                  variant="primary"
                  colors={
                    type === 'intern'
                      ? 'button-default-active'
                      : 'button-default'
                  }
                  onClick={() => setType('intern')}
                />
                <Button
                  title="Full-time"
                  variant="primary"
                  colors={
                    type === 'fulltime'
                      ? 'button-default-active'
                      : 'button-default'
                  }
                  onClick={() => setType('fulltime')}
                />
              </Flex>
              <Flex flexGrow={1}>
                <Input
                  width={250}
                  placeholder="Owner name"
                  type="text"
                  value={owner}
                  icLeft="person"
                  onChange={e => setOwner(e.target.value)}
                  error={inputError === 'owner'}
                  noBottomSpace
                />
              </Flex>
              <Flex flexGrow={1}>
                <Input
                  width={250}
                  placeholder="Date"
                  type="text"
                  value={date}
                  icLeft="calendar_today"
                  onChange={e => setDate(e.target.value)}
                  error={inputError === 'date'}
                  noBottomSpace
                />
              </Flex>
              <Flex flexGrow={1}>
                <Dropdown
                  width={250}
                  value={location}
                  onChange={e => setLocation(e)}
                  noBottomSpace
                >
                  {options.map(option => (
                    <Dropdown.Option key={option.id} value={option.label}>
                      {option.label}
                    </Dropdown.Option>
                  ))}
                </Dropdown>
              </Flex>
              <Flex
                flexGrow={2}
                alignItems="center"
                justifyContent="center"
                className="upload"
              >
                Upload candidate profiles
              </Flex>
            </Flex>
          </Space>
        </div>
        <div className="candidates">
          <Flex flexDirection="column">
            <Flex justifyContent="space-between">
              <Typography variant="h2">Morning</Typography>
              <Button
                title="Add candidate"
                variant="outline"
                colors="outline-button"
                onClick={() => setModal({ open: true, type: 'morning' })}
              />
            </Flex>
            {candidates.filter(candidate => candidate.type === 'morning')
              .length > 0 && (
              <Flex>
                <CandidateTable
                  candidates={candidates.filter(
                    candidate => candidate.type === 'morning'
                  )}
                  deleteCandidate={deleteCandidate}
                />
              </Flex>
            )}
          </Flex>
        </div>
        <div className="candidates">
          <Flex flexDirection="column">
            <Flex justifyContent="space-between">
              <Typography variant="h2">Afternoon</Typography>
              <Button
                title="Add candidate"
                variant="outline"
                colors="outline-button"
                onClick={() => setModal({ open: true, type: 'afternoon' })}
              />
            </Flex>
            {candidates.filter(candidate => candidate.type === 'afternoon')
              .length > 0 && (
              <Flex>
                <CandidateTable
                  candidates={candidates.filter(
                    candidate => candidate.type === 'afternoon'
                  )}
                  deleteCandidate={deleteCandidate}
                />
              </Flex>
            )}
          </Flex>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default withRouter(AddDay);
