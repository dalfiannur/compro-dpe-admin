import React, {ChangeEvent, useEffect} from "react";
import {usePostSkinConcernMutation} from "../../../services";
import {Box, Button, Grid, Input, InputWrapper, LoadingOverlay, Modal} from "@mantine/core";
import {useFormik} from "formik";
import * as yup from 'yup'

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

export const FormCreate = (props: FormCreateProp) => {
  const {open, onClose, onCreated} = props;

  const [onSubmit, {isLoading, isSuccess}] = usePostSkinConcernMutation();
  const {values, errors, setFieldValue, submitForm, resetForm} = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit
  });

  useEffect(() => {
    if (isSuccess) {
      onCreated();
      resetForm()
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size="xl"
      title="Create New Skin Concern"
    >
      <LoadingOverlay visible={isLoading}/>
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <Grid>
          <Grid.Col>
            <InputWrapper
              required
              label="Skin Concern"
              error={errors.name}
            >
              <Input
                value={values.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Box>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          display: 'flex',
          justifyContent: 'end',
          gap: theme.spacing.md
        })}
      >
        <Button
          onClick={onClose}
          color="gray"
        >
          Cancel
        </Button>

        <Button onClick={submitForm}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};
