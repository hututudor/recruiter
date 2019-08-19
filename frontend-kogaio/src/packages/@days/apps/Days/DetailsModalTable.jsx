import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet } from '@kogaio';

const Table = styled.table`
  min-width: 30rem;
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
    tr:nth-child(even) {
      background: ${themeGet('colors.table.f')} !important;
    }

    tr:nth-child(odd) {
      background: ${themeGet('colors.table.i')} !important;
    }

    td {
      padding: 1rem 0;
    }
  }

  td:first-child {
    padding-left: 0.3rem;
  }
`;

const DetailsModalTable = ({ candidates }) => {
  return (
    <Table>
      <thead>
      <tr>
        <td>Type</td>
        <td>First name</td>
        <td>Last name</td>
        <td>Gender</td>
        <td>Education</td>
      </tr>
      </thead>
      <tbody>{
        candidates.map(candidate => (
          <tr>
            <td>{candidate.type.charAt(0).toUpperCase() + candidate.type.substr(1, candidate.type.length)}</td>
            <td>{candidate.firstName}</td>
            <td>{candidate.lastName}</td>
            <td>{candidate.gender}</td>
            <td>{candidate.education}</td>
          </tr>
        ))
      }</tbody>
    </Table>
  );
};

DetailsModalTable.propTypes = {
  candidate: PropTypes.array
};

export default DetailsModalTable;
