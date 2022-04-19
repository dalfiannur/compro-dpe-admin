import {
  Box,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle } from "react";
import { usePostSkinTypeMutation } from "../../../services";

type FormCreateProp = {
  onSuccess: () => void
  onProcess: () => void
}

export const FormCreate = forwardRef((props: FormCreateProp, ref) => {
  const { onSuccess, onProcess } = props
  const [onSubmit, { isLoading, data }] = usePostSkinTypeMutation()
  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit,
  })

  useImperativeHandle(ref, () => ({
    submit: submitForm
  }), [])

  useEffect(() => {
    if(data) {
      onSuccess()
    }
    if (isLoading) {
      onProcess()
    }
  }, [data, isLoading])

  return (
    <Box
      sx={{
        marginTop: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={values.name}
            label="Skin Type"
            variant="outlined"
            sx={{ width: "100%" }}
            error={touched.name && !!errors.name}
            helperText={touched.name && !!errors.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
});