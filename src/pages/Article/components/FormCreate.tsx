import React, { useEffect } from "react";
import { usePostArticleMutation } from "../../../services";
import { ImagePicker } from "../../../components/ImagePicker";
import {
  Modal,
  Box,
  Grid,
  InputWrapper,
  Input,
  Button,
  MultiSelect,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useMantineTheme } from "@mantine/core";
import { useFormik } from "formik";
import * as y from "yup";
import { useInputState } from "@mantine/hooks";

const validationSchema = y.object({
  title: y.string().required(),
  content: y.string(),
  thumbnail: y.string().required(),
  tags: y.array(y.string()).required()
});

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export const FormCreate = (props: FormCreateProp) => {
  const { open, onClose, onCreated } = props;
  const [tags, setTags] = useInputState<string[]>([]);

  const theme = useMantineTheme();

  const [onSubmit, { data: result }] = usePostArticleMutation();

  const { values, errors, submitForm, setFieldValue, touched } = useFormik({
    validationSchema,
    initialValues: {
      title: "",
      content: "",
      thumbnail: "",
      isFeatured: false,
      tags: "",
    },
    onSubmit,
    enableReinitialize: true
  });

  useEffect(() => {
    if (result) {
      onCreated();
    }
  }, [result]);

  useEffect(() => {
    setFieldValue("tags", tags);
  }, [tags]);

  useEffect(() => {
    console.log(errors);
  }, [errors])

  return (
    <Modal opened={open} onClose={onClose} size="xl" title="Add Article">
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <Grid>
          <Grid.Col>
            <InputWrapper
              id="input-name"
              label="Title"
              required
              error={touched.title && errors.title}
            >
              <Input
                value={values.title}
                onChange={(e: any) => setFieldValue("title", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Content"
              error={touched.content && errors.content}
            >
              <RichTextEditor
                value={values.content}
                onChange={(value) => setFieldValue("content", value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              id="input-tags"
              label="Tags"
              required
              error={touched.tags && errors.tags}
            >
              <MultiSelect
                data={tags}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => setTags([...tags, query])}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Thumbnail"
              error={touched.thumbnail && errors.thumbnail}
            >
              <ImagePicker
                result={(val) => setFieldValue("thumbnail", val)}
                aspectRatio={16 / 9}
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
          Save
        </Button>
      </Box>
    </Modal>
  );
};
