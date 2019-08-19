import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Space, Box, Flex, Typography, Button } from '@kogaio';

import DetailsModalTable from './DetailsModalTable';

const DetailsModal = ({ day, hideModal, isShown }) => {
  return (
    <Modal onBackdropClick={hideModal} visible={isShown} withPortal>
      <Space px={4} py={6}>
        <Box bg="white">
          <Typography variant="h3" textAlign="left" pb={6}>
            Details - Candidates
          </Typography>
          <div>
            {day && day.candidates && day.candidates.length > 0 ? (
              <DetailsModalTable candidates={day.candidates} />
            ) : (
              <Typography variant="h4" textAlign="center" pb={6} color="table.head.text-color" fontWeight="700">
                There are no candidates
              </Typography>
            )}
          </div>
          <Flex alignItems="center" justifyContent="center">
            <Space mt={3} mr={1}>
              <Button
                onClick={hideModal}
                title="Close"
                variant="outline"
                colors="outline-button"
              />
            </Space>
          </Flex>
        </Box>
      </Space>
    </Modal>
  );
};

DetailsModal.propTypes = {
  day: PropTypes.object,
  isShown: PropTypes.bool,
  hide: PropTypes.func
};

export default DetailsModal;
