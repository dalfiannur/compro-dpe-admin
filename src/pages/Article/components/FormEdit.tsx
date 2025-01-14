import React, {
    ChangeEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    useGetUsersQuery,
    usePostImgMutation,
    usePutArticleMutation,
} from "../../../services";
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
    Image,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useMantineTheme } from "@mantine/core";
import { useFormik } from "formik";
import * as y from "yup";
import { useInputState } from "@mantine/hooks";
import { Article } from "entities";
import "../../../assets/style.css";
import { useModal } from "../../../hooks/useModal";
import { ImageUploader } from "../../../components/ImageUploader";
import { InputImage } from "../../../components/InputImage";

const validationSchema = y.object({
    title: y.string().required(),
    authorId: y.number().required(),
    content: y.string(),
    thumbnail: y.string().required(),
    tags: y.array(y.string()).required(),
});

type FormCreateProp = {
    open: boolean;
    data: Article;
    onClose: () => void;
    onUpdated: () => void;
};

export const FormEdit = (props: FormCreateProp) => {
    const { open, onClose, onUpdated, data } = props;
    const [tags, setTags] = useInputState<string[]>([]);

    const theme = useMantineTheme();
    const { data: user } = useGetUsersQuery({
        page: 1,
        perPage: 100,
    });
    const userOption = useMemo(() => {
        if (user) {
            return user.data.data.map((item) => ({
                label: item.name,
                value: item.id.toString(),
            }));
        }
        return [];
    }, [user]);

    const [onSubmit, { data: result }] =
        usePutArticleMutation();

    const {
        values,
        errors,
        submitForm,
        setFieldValue,
        touched,
    } = useFormik({
        validationSchema,
        initialValues: {
            id: data.id,
            authorId: data.user.id,
            title: data.title,
            content: data.content,
            thumbnail: data.thumbnail,
            thumbnailUrl: data.thumbnailUrl,
            isFeatured: data.isFeatured,
            tags: data.tags.map((item) =>
                item.id.toString()
            ),
        },
        onSubmit,
        enableReinitialize: true,
    });

    useEffect(() => {
        if (result) {
            onUpdated();
        }
    }, [result]);

    useEffect(() => {
        setFieldValue("tags", tags);
    }, [tags]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <Modal
            opened={open}
            onClose={onClose}
            size="xl"
            title="Edit Article"
        >
            <Box
                sx={{
                    marginTop: 1,
                }}
                className="modal-body"
            >
                <Grid>
                    <Grid.Col>
                        <InputWrapper
                            id="input-name"
                            label="Title"
                            required
                            error={
                                touched.title &&
                                errors.title
                            }
                        >
                            <Input
                                value={values.title}
                                onChange={(e: any) =>
                                    setFieldValue(
                                        "title",
                                        e.target.value
                                    )
                                }
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
                                value={String(
                                    values.authorId
                                )}
                                data={userOption}
                                onChange={(e) =>
                                    setFieldValue(
                                        "authorId",
                                        +(e as string)
                                    )
                                }
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            required
                            label="Content"
                            error={
                                touched.content &&
                                errors.content
                            }
                        >
                            <RichTextEditor
                                value={values.content}
                                onChange={(value) =>
                                    setFieldValue(
                                        "content",
                                        value
                                    )
                                }
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            id="input-tags"
                            label="Tags"
                            required
                            error={
                                touched.tags && errors.tags
                            }
                        >
                            <MultiSelect
                                data={data.tags.map(
                                    (item) => ({
                                        label: item.name,
                                        value: item.id.toString(),
                                    })
                                )}
                                searchable
                                creatable
                                value={values.tags}
                                // data={data.tags?.map((item) => ({label: item.name, value: item.id.toString()})) || []}
                                onChange={(value: any) =>
                                    setFieldValue(
                                        "tags",
                                        value
                                    )
                                }
                                getCreateLabel={(query) =>
                                    `+ Create ${query}`
                                }
                                onCreate={(query) =>
                                    setTags([
                                        ...tags,
                                        query,
                                    ])
                                }
                            />
                        </InputWrapper>
                    </Grid.Col>
                    <Grid.Col>
                        <InputWrapper
                            required
                            label="Thumbnail"
                            error={
                                touched.thumbnail &&
                                errors.thumbnail
                            }
                        >
                            {/* <ImageUploader
                  defaultImage={values.thumbnailUrl}
                  propsOnChange={(value:any) => setFieldValue("thumbnail", value[0])}
              /> */}

                            <InputImage
                                propsOnChange={(
                                    value: any
                                ) =>
                                    setFieldValue(
                                        "thumbnail",
                                        value[0]
                                    )
                                }
                                defaultImage={values.thumbnailUrl}
                                imgRatio={8 / 5}
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
