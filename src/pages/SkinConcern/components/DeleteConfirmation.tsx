import {Box, Button, LoadingOverlay, Modal, Text} from "@mantine/core";
import React, {FC, useEffect} from "react";
import {useDeleteSkinConcernMutation} from "../../../services";
import {SkinConcern} from "../../../entities/SkinConcern";

interface DeleteConfirmationProp {
  open: boolean;
  data: SkinConcern;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteConfirmation: FC<DeleteConfirmationProp> = ({open, onClose, onDeleted, data}) => {
  const [deleteRequest, {isLoading, isSuccess}] = useDeleteSkinConcernMutation();

  useEffect(() => {
    if (isSuccess) {
      onDeleted();
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Delete Skin Concern"
    >
      <LoadingOverlay visible={isLoading}/>

      <Box>
        <Text>
          Are you sure you want to delete this skin concern?
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
