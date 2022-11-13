import {Box, Button, LoadingOverlay, Modal, Text} from "@mantine/core";
import React, {FC, useEffect} from "react";
import {useDeleteUserMutation} from "../../../services";
import {User} from "../../../entities/User";

interface DeleteConfirmationProp {
  open: boolean;
  data: User;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteConfirmation: FC<DeleteConfirmationProp> = ({open, onClose, onDeleted, data}) => {
  const [deleteRequest, {isLoading, isSuccess}] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      onDeleted();
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Delete Skin Type"
    >
      <LoadingOverlay visible={isLoading}/>

      <Box>
        <Text>
          Are you sure you want to delete this skin type?
        </Text>
      </Box>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          display: 'flex',
          justifyContent: 'end',
          gap: theme.spacing.md
        })}
      >
        <Button onClick={onClose}>
          No
        </Button>

        <Button
          variant="outline"
          color="red"
          onClick={() => deleteRequest(data.id)}>
          Yes
        </Button>
      </Box>
    </Modal>
  )
}
