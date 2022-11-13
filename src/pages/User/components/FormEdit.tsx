import React, {ChangeEvent, FC, useEffect} from "react";
import {User} from "../../../entities/User";
import {usePutUserMutation} from "../../../services";
import {Box, Button, Grid, Input, InputWrapper, Modal} from "@mantine/core";
import {useFormik} from "formik";
import * as yup from 'yup';

interface FormEditProp {
  open: boolean;
  data: User;
  onUpdated: () => void;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
});

export const FormEdit = (props: FormEditProp) => {
  const { open, onClose, onUpdated, data } = props;

  const [onSubmit, { data: result }] = usePutUserMutation();

  const {values, errors, setFieldValue, submitForm} = useFormik({
    initialValues: {
      id: data.id,
      name: data.name
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true
  });

  useEffect(() => {
    if (result) {
      onUpdated();
    }
  }, [result]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size="xl"
      title="Edit Skin Type"
    >
      <Box>
        <Grid>
          <Grid.Col>
            <InputWrapper
              required
              label="Skin Type"
              error={errors.name}
            >
              <Input
                value={values.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("name", e.target.value)}
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
          color="gray"
          onClick={onClose}
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
