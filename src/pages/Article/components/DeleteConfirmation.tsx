import React, {useEffect} from "react";
import {useDeleteArticleMutation} from "../../../services";
import {Box, Button, Modal, Text} from "@mantine/core";
import { Article } from "entities";

type DeleteConfirmationProp = {
  data: Article,
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteConfirmation = (props: DeleteConfirmationProp) => {
  const {open, data, onClose, onDeleted} = props;

  const [deleteRequest, {isSuccess}] = useDeleteArticleMutation();

  useEffect(() => {
    if (isSuccess) {
      onDeleted()
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Delete Article"
    >
      <Box>
        <Text>
          Are you sure want to delete this product?
        </Text>
      </Box>

      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'end',
          gap: theme.spacing.md,
          marginTop: theme.spacing.md
        })}
      >
        <Button onClick={onClose}>No</Button>
        <Button
          color="red"
          variant="outline"
          onClick={() => deleteRequest(data.id)}
        >
          Yes
        </Button>
      </Box>
    </Modal>
  )
};
