import React, {useEffect} from "react";
import {Banner} from "../../../entities";
import {useDeleteBannerMutation} from "../../../services";
import {Box, Button, Modal, Text} from "@mantine/core";

type DeleteConfirmationProp = {
  item?: Banner;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

const DeleteConfirmation = (props: DeleteConfirmationProp) => {
  const {item, open, onClose, onDeleted} = props;

  const [deleteRequest, {isSuccess}] = useDeleteBannerMutation();

  const handleDeleteButton = () => {
    if (item) {
      deleteRequest(item.id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onDeleted();
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Delete Banner"
    >

      <Text>
        Are you sure you want to delete this banner?
      </Text>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          display: 'flex',
          justifyContent: 'end',
          gap: theme.spacing.md
        })}
      >
        <Button
          color="blue"
          onClick={onClose}
        >
          No
        </Button>

        <Button
          color="red"
          variant="outline"
          onClick={handleDeleteButton}
        >
          Yes
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmation;
