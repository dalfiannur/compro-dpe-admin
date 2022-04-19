import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";
import { Banner } from "../../../entities";
import { useDeleteBannerMutation } from "../../../services";

type DeleteConfirmationProp = {
  item?: Banner;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

const DeleteConfirmation = (props: DeleteConfirmationProp) => {
  const { item, open, onClose, onDeleted } = props;

  const [deleteRequest, { data }] = useDeleteBannerMutation();

  const handleDeleteButton = () => {
    if (item) {
      deleteRequest(item.id);
    }
  };

  useEffect(() => {
    if (data) {
      onDeleted();
    }
  }, [data, onDeleted]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this banner?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleDeleteButton}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
