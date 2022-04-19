import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ImagePicker } from "../../../components/ImagePicker";
import { usePostBannerMutation } from "../../../services";

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const FormCreate = (props: FormCreateProp) => {
  const { open, onClose, onCreated } = props;

  const [onSubmit, { data }] = usePostBannerMutation();

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      imageSource: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (data) {
      onCreated();
    }
  }, [data, onCreated]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Banner</DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={values.title}
                sx={{ width: "100%" }}
                onChange={(e) => setFieldValue("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Sub Title"
                value={values.subTitle}
                sx={{ width: "100%" }}
                onChange={(e) => setFieldValue("subTitle", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ImagePicker result={(e) => setFieldValue("imageSource", e)} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="button" onClick={submitForm}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreate;
