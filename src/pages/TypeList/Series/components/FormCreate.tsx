import {
  Box,
  Button,
  ColorInput,
  Grid,
  Input,
  InputWrapper,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as y from "yup";
import { ImagePicker } from "../../../../components/ImagePicker";
import { usePostTypeSeriesMutation } from "../../../../services";
import { InputImage } from "../../../../components/InputImage";

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export const FormCreate = (props: FormCreateProp) => {
  const { open, onClose, onCreated } = props;

  const theme = useMantineTheme();

  const [onSubmit, { data: result }] = usePostTypeSeriesMutation();

  const [icon, setIcon] = useState("");

  const validationSchema = y.object({
    name: y.string().required(),
    icon: y.string(),
    description: y.string(),
  });

  const { values, errors, submitForm, setFieldValue, touched } = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      description: "",
      banner: "",
      bg_color_hex: "",
      slug: "",
      icon: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (result) {
      onCreated();
    }
  }, [result]);

  useEffect(() => {
    setFieldValue("icon", icon);
  }, [icon]);

  return (
    <Modal opened={open} onClose={onClose} size="xl" title="Add Series">
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <Grid>
          <Grid.Col>
            <InputWrapper
              id="input-name"
              label="ProdSeries Name"
              required
              error={errors.name}
            >
              <Input
                value={values.name}
                onChange={(e: any) => setFieldValue("name", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Content"
              error={touched.description && errors.description}
            >
              <RichTextEditor
                value={values.description}
                onChange={(value) => setFieldValue("description", value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Color"
              error={errors.bg_color_hex as string}
            >
              <ColorInput
                placeholder="Pick Color"
                value={values.bg_color_hex}
                onChange={(value) => setFieldValue("bg_color_hex", value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper label="Icon" error={errors.icon as string}>
              <InputImage
                imgRatio={1/1}
                propsOnChange={(value: any) => setFieldValue("icon", value[0])}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Banner"
              error={errors.banner as string}
            >
              <InputImage
                imgRatio={12 / 5}
                propsOnChange={(value: any) =>
                  setFieldValue("banner", value[0])
                }
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: theme.spacing.md,
        }}
      >
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={submitForm}
          sx={{
            marginLeft: theme.spacing.md,
          }}
        >
          Saves
        </Button>
      </Box>
    </Modal>
  );
};
