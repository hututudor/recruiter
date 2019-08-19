import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Space, Box, Typography, Flex, Button, Input } from '@kogaio';

const AddCandidateModal = ({ hideModal, isShown, type, add }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');

  const onSubmit = () => {
    add({
      type,
      firstName: first,
      lastName: last,
      gender,
      education
    });

    setFirst('');
    setLast('');
    setGender('');
    setEducation('');

    hideModal();
  };

  return (
    <Modal onBackdropClick={hideModal} visible={isShown} withPortal>
      <Space px={4} py={6}>
        <Box bg="white">
          <Typography variant="h3" textAlign="center" pb={6}>
            Add {type} candidate
          </Typography>
          <div>
            <Input
              type="text"
              placeholder="First name"
              value={first}
              onChange={e => setFirst(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last name"
              value={last}
              onChange={e => setLast(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={e => setGender(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Education"
              value={education}
              onChange={e => setEducation(e.target.value)}
            />
          </div>
          <Flex alignItems="center" justifyContent="right">
            <Space mt={3} mx={1}>
              <Button onClick={hideModal} title="Close" variant="outline" colors="outline-button" />
              <Button onClick={onSubmit} title="Add"  />
            </Space>
          </Flex>
        </Box>
      </Space>
    </Modal>
  );
};

AddCandidateModal.propTypes = {
  hideModal: PropTypes.func,
  isShown: PropTypes.bool,
  type: PropTypes.string,
  add: PropTypes.func
};

export default AddCandidateModal;
