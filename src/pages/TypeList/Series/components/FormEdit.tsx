import {
  Box,
  Button,
  ColorInput,
  Grid,
  Input,
  InputWrapper,
  Modal
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { TypeSeries } from "entities";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as y from "yup";
import "../../../../assets/style.css";
import { InputImage } from "../../../../components/InputImage";
import { usePutTypeSeriesMutation } from "../../../../services";

type FormEditProp = {
  data: TypeSeries;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export const FormEdit = (props: FormEditProp) => {
  const { data, open, onClose, onUpdated } = props;

  const [onSubmit, { data: result }] = usePutTypeSeriesMutation();

  const validationSchema = y.object({
    name: y.string().required(),
    slug: y.string().required(),
    description: y.string(),
  });

  const { values, errors, setFieldValue, submitForm, touched } = useFormik({
    validationSchema,
    initialValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      banner: data.banner,
      bg_color_hex: data.bg_color_hex,
      iconUrl: data.iconUrl,
      bannerUrl: data.bannerUrl,
      slug: data.slug,
    },
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (result) {
      onUpdated();
    }
  }, [result]);

  return (
    <Modal opened={open} onClose={onClose} title="Edit Series" size="xl">
      <Box className="modal-body">
        <Grid>
          <Grid.Col>
            <InputWrapper
              label="Type Categories Name"
              error={errors.name as string}
            >
              <Input
                value={values.name}
                onChange={(e: any) => setFieldValue("name", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col>
            <InputWrapper
              label="Type Categories Slug"
              error={errors.slug as string}
            >
              <Input
                value={values.slug}
                onChange={(e: any) => setFieldValue("slug", e.target.value)}
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
            <InputWrapper
              required
              label="Icon"
              error={errors.iconUrl as string}
            >
              <InputImage
                imgRatio={1/1}
                propsOnChange={(value: any) => setFieldValue("icon", value[0])}
                defaultImage={values.iconUrl}
              />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col>
            <InputWrapper
              required
              label="Banner"
              error={errors.bannerUrl as string}
            >
              <InputImage
                propsOnChange={(value: any) =>
                  setFieldValue("banner", value[0])
                }
                defaultImage={values.bannerUrl}
                imgRatio={12 / 5}
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Box>

      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "end",
          marginTop: theme.spacing.md,
          gap: theme.spacing.md,
        })}
      >
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={() => submitForm()}>Save</Button>
      </Box>
    </Modal>
  );
};
