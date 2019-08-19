import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, Button, Flex } from '@kogaio';

const Table = styled.table`
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

      &:last-child {
        text-align: right;
      }
    }
  }

  td:first-child {
    padding-left: 0.3rem;
  }

  .button {
    margin-right: 0.625rem;
  }
`;

const CandidateTable = ({ candidates, deleteCandidate }) => {
  return (
    <Table>
      <thead>
        <tr>
          <td>First name</td>
          <td>Last name</td>
          <td>Gender</td>
          <td>Education</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {candidates.map(candidate => (
          <tr>
            <td>{candidate.firstName}</td>
            <td>{candidate.lastName}</td>
            <td>{candidate.gender}</td>
            <td>{candidate.education}</td>
            <td>
              <Flex justifyContent="flex-end">
                <Button
                  width={0.2}
                  title="Delete"
                  onClick={() => deleteCandidate(candidate)}
                  variant="destructive"
                  className="button"
                  colors="basic-destructive-button"
                />
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

CandidateTable.propTypes = {
  candidates: PropTypes.array,
  deleteCandidate: PropTypes.func
};

export default CandidateTable;
