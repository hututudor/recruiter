import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { themeGet, Button, Flex } from '@kogaio';
import useDate from '@shared/hooks/useDate';

const Tab = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    color: ${themeGet('colors.table.head.text-color')};

    td {
      padding-bottom: 0.3rem;
    }

    td:last-child {
      margin: auto;
    }
  }

  tbody {
    td {
      padding: 1rem 0;
      background: ${themeGet('colors.table.i')};

      &:last-child {
        text-align: right;
      }

      &:first-child {
        text-align: left;
        padding-left: 1rem;

        span {
          background: #d76249;
          border: 1px solid #d76249;
          color: white;
          border-radius: 5rem;
          padding: 0.2rem 0.54rem;
          font-family: 'VT323', monospace;
        }
      }
    }

    .F > td {
      background: ${themeGet('colors.table.f')} !important;
    }
  }

  .button {
    margin-right: 0.625rem;
  }
`;

const Table = ({ days }) => {
  const currentDate = useDate();

  const getStatus = date => {
    if (new Date(date).getTime() > currentDate.getTime()) return 'Waiting';
    if (new Date(date).getTime() === currentDate.getTime())
      return 'In progress';
    return '-';
  };

  return (
    <Tab>
      <thead>
        <tr>
          <td>Type</td>
          <td>Date</td>
          <td>Location</td>
          <td>Owner</td>
          <td>Status</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {days.map(day => (
          <tr key={day.id} className={day.type.charAt(0).toUpperCase()}>
            <td>
              <span>{day.type.charAt(0).toUpperCase()}</span>
            </td>
            <td>{new Date(day.date).toLocaleDateString()}</td>
            <td>{day.location}</td>
            <td>{day.owner}</td>
            <td>{getStatus(day.date)}</td>
            <td>
              <Flex justifyContent="flex-end">
                <Button
                  width={0.1}
                  className="button"
                  colors="basic-button"
                  title="Details"
                />
                <Button
                  width={0.15}
                  className="button"
                  colors="basic-button"
                  title="Edit"
                />
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Tab>
  );
};

Table.propTypes = {
  days: PropTypes.array
};

export default Table;
