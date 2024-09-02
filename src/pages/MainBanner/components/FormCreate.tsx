import { useFormik } from "formik";
import React, { useEffect } from "react";
import { ImagePicker } from "../../../components/ImagePicker";
import { usePostBannerMutation } from "../../../services";
import { Box, Button, Grid, Input, InputWrapper, Modal } from "@mantine/core";
import { TextField } from "@mui/material";
import { InputImage } from "../../../components/InputImage";

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const FormCreate = (props: FormCreateProp) => {
  const { open, onClose, onCreated } = props;

  const [onSubmit, { isSuccess }] = usePostBannerMutation();

  const { values, errors, setFieldValue, submitForm } = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      imageSource: "",
      imageSourceCropped: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (isSuccess) {
      onCreated();
    }
  }, [isSuccess]);

  return (
    <Modal opened={open} onClose={onClose} title="Add New Banner" size="xl">
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <Grid>
          <Grid.Col>
            <InputWrapper required label="Title" error={errors.title}>
              <Input
                value={values.title}
                onChange={(e: any) => setFieldValue("title", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper required label="Sub Title" error={errors.subTitle}>
              <Input
                value={values.subTitle}
                onChange={(e: any) => setFieldValue("subTitle", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper required label="Image" error={errors.imageSource}>

              <InputImage 
                propsOnChange={(value: any) => {
                  setFieldValue("imageSource", value[0]);
                }}
                imgRatio={12 / 5}
              />
              
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Image Mobile"
              error={errors.imageSourceCropped}
            >

              <InputImage 
                propsOnChange={(value: any) => {
                  setFieldValue("imageSourceCropped", value[0]);
                }}
                imgRatio={1 / 1}
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Box>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          display: "flex",
          justifyContent: "end",
          gap: theme.spacing.md,
        })}
      >
        <Button onClick={onClose} color="gray">
          Cancel
        </Button>
        <Button type="button" onClick={submitForm}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default FormCreate;
