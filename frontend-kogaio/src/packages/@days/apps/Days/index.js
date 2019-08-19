import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Button, Typography, ActivityIndicator, Space } from '@kogaio';
import { withRouter } from 'react-router-dom';

import { TimeButton, Table } from '@days/components';
import useDate from '@shared/hooks/useDate';
import daysService from '@days/services/days';

const Wrapper = styled.div`
  width: 80%;
  margin-top: 1rem;

  .time {
    border-bottom: 1px solid #dee0e3;
    padding-bottom: 0;
  }

  .table {
    margin-top: 1rem;
    margin-bottom: 1rem;

    & > div {
      margin-top: 10rem;
    }
  }
`;

const Days = props => {
  const [days, setDays] = useState([]);
  const [time, setTime] = useState(-1);
  const [type, setType] = useState('all');
  const currentDate = useDate();

  const onStart = async () => {
    const res = await daysService.getAll();
    setDays(res.data.Items);
  };

  const filter = () => {
    return days
      .filter(day => {
        if (type === 'all') return day;
        if (type === 'full' && day.type.charAt(0).toLowerCase() === 'f')
          return day;
        if (type === 'intern' && day.type.charAt(0).toLowerCase() === 'i')
          return day;
      })
      .filter(day => {
        if (time === 0) return day;
        if (
          time === -1 &&
          new Date(day.date).getTime() >= currentDate.getTime()
        )
          return day;
        if (time === 1 && new Date(day.date).getTime() < currentDate.getTime())
          return day;
      });
  };

  useEffect(() => {
    onStart();
  }, []);

  return (
    <Wrapper>
      <div className="time">
        <TimeButton
          text="Upcoming days"
          active={time === -1}
          onClick={() => (time === -1 ? setTime(0) : setTime(-1))}
        />
        <TimeButton
          text="Passed days"
          active={time === 1}
          onClick={() => (time === 1 ? setTime(0) : setTime(1))}
        />
      </div>
      <div className="buttons">
        <Space mt={{ xs: 3, lg: 4 }} mb={3}>
          <Flex justifyContent="space-between">
            <Flex flexdirection="row">
              <Button
                variant="primary"
                title="All"
                colors={
                  type === 'all' ? 'button-default-active' : 'button-default'
                }
                onClick={() => setType('all')}
              />
              <Button
                variant="primary"
                title="Full-time"
                colors={
                  type === 'full' ? 'button-default-active' : 'button-default'
                }
                onClick={() => setType('full')}
              />
              <Button
                variant="primary"
                title="Intern"
                colors={
                  type === 'intern' ? 'button-default-active' : 'button-default'
                }
                onClick={() => setType('intern')}
              />
            </Flex>
            <span>
              <Button
                variant="primary"
                colors="button-action"
                title="Add new"
                onClick={() => props.history.push('/add')}
              />
            </span>
          </Flex>
        </Space>
      </div>
      <div className="table">
        {days.length >= 1 ? (
          <Table days={filter()} />
        ) : (
          <Flex justifyContent="center">
            <ActivityIndicator
              colors={{ background: 'white', primary: 'time-button.selected' }}
              size="3rem"
            />
          </Flex>
        )}
      </div>
    </Wrapper>
  );
};

export default withRouter(Days);
