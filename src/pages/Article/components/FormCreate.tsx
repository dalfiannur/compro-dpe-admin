import React, {useEffect, useMemo, useState} from "react";
import { useGetUsersQuery, usePostArticleMutation } from "../../../services";
import { ImagePicker } from "../../../components/ImagePicker";
import {
  Modal,
  Box,
  Grid,
  InputWrapper,
  Input,
  Button,
  MultiSelect,
  Select,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useMantineTheme } from "@mantine/core";
import { useFormik } from "formik";
import * as y from "yup";
import { useInputState } from "@mantine/hooks";
import {ImageUploader} from "../../../components/ImageUploader";
import {useModal} from "../../../hooks/useModal";

const validationSchema = y.object({
  title: y.string().required(),
  authorId: y.number().required(),
  content: y.string(),
  thumbnail: y.string(),
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

  const [banner, setBanner] = useState<string>('')

  const theme = useMantineTheme();
  const {data: user} = useGetUsersQuery({
    page: 1,
    perPage: 100,
  })
  const userOption = useMemo(() => {
    if(user){
      return user.data.data.map((item) => ({
        label: item.name,
        value: item.id.toString()
      }))
    }
    return []
  }, [user])

  const [onSubmit, { data: result }] = usePostArticleMutation();

  const { values, errors, submitForm, setFieldValue, touched } = useFormik({
    validationSchema,
    initialValues: {
      title: "",
      authorId: 0,
      content: '',
      thumbnail: '',
      isFeatured: false,
      tags: [],
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
    setFieldValue('thumbnail', banner)
  }, [banner])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])

  const [modal, setModal] = useModal();
  const handleUploaderImage = (item: any) => {
    setModal("edit", true);
  };


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
              label="Author"
              required
              error={errors.authorId}
            >
              <Select
                data={userOption}
                onChange={(e) => setFieldValue('authorId', + (e as string))}
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
            <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >
              <InputWrapper
                  required
                  label="Thumbnail"
                  error={touched.thumbnail && errors.thumbnail}
              >
                <div style={{
                  position: "relative",
                  border: `1px solid #cecece`,
                  borderRadius: 4,
                  width: "100%",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <ImageUploader
                      open={modal.edit}
                      onClose={() => setModal("edit", false)}
                      propsOnChange={(value:any) => setFieldValue("thumbnail", value[0])}
                  />
                </div>
              </InputWrapper>
              <Button style={{width: 200}} onClick={handleUploaderImage}>Change Image Here</Button>
            </div>
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
