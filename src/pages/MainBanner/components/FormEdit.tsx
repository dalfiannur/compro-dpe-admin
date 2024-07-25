import { Banner } from "entities";
import { useFormik } from "formik";
import { usePutBannerMutation } from "../../../services";
import { useEffect } from "react";
import { Box, Button, Grid, Input, InputWrapper, Modal } from "@mantine/core";
import { ImagePicker } from "../../../components/ImagePicker";

type FormEditProp = {
  data: Banner;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

const FormEdit = (props: FormEditProp) => {
  const { data, open, onClose, onUpdated } = props;

  const [onSubmit, { isSuccess }] = usePutBannerMutation();

  const { values, errors, setFieldValue, submitForm } = useFormik({
    initialValues: {
      id: data.id,
      title: data.title,
      subTitle: data.subTitle,
      imageSource: data.imageSource,
      imageSourceCropped: data.imageSourceCropped,
      imageSourceUrl: data.imageSourceUrl,
      imageSourceCroppedUrl: data.imageSourceCroppedUrl,
    },
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isSuccess) {
      onUpdated();
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
              <ImagePicker
                result={""}
                propsOnChange={(value: any) => {
                  setFieldValue("imageSource", value[0]);
                }}
                aspectRatio={12 / 5}
                defaultImage={values.imageSourceUrl}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Image Mobile"
              error={errors.imageSourceCropped}
            >
              <ImagePicker
                result={""}
                propsOnChange={(value: any) => {
                  setFieldValue("imageSourceCropped", value[0]);
                }}
                aspectRatio={2 / 1}
                defaultImage={values.imageSourceCroppedUrl}
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

export default FormEdit;
