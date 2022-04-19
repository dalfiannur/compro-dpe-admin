import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Product} from "../../../entities/Product";
import { useDeleteProductMutation } from "../../../services";

type DeleteConfirmationProp = {
  data: Product|null,
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteConfirmation = (props: DeleteConfirmationProp) => {
  const {open, data, onClose, onDeleted} = props;

  if (!data) {
    return <div />
  }

  const [submitForm, { data: result, isSuccess }] = useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      onDeleted()
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button color="error" onClick={() => submitForm(data.id)}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
