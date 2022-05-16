import React, {ChangeEvent, FC, useEffect} from "react";
import {SkinType} from "../../../entities/SkinType";
import {usePutSkinTypeMutation} from "../../../services";
import {Box, Button, Grid, Input, InputWrapper, LoadingOverlay, Modal} from "@mantine/core";
import {useFormik} from "formik";
import * as yup from 'yup';

interface FormEditProp {
  open: boolean;
  data: SkinType;
  onUpdated: () => void;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
});

export const FormEdit: FC<FormEditProp> = ({open, data, onClose, onUpdated}) => {

  const [onSubmit, {isLoading, isSuccess}] = usePutSkinTypeMutation();

  const {values, errors, setFieldValue, submitForm} = useFormik({
    initialValues: {
      id: data.id,
      name: data.name
    },
    validationSchema,
    onSubmit
  });

  useEffect(() => {
    if (isSuccess) {
      onUpdated();
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size="xl"
      title="Edit Skin Type"
    >
      <LoadingOverlay visible={isLoading} />

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
