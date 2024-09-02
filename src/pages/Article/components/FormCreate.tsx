import {
    Box,
    Button,
    Grid,
    Input,
    InputWrapper,
    Modal,
    MultiSelect,
    Select,
    useMantineTheme,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/rte";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as y from "yup";
import { InputImage } from "../../../components/InputImage";
import {
    useGetUsersQuery,
    usePostArticleMutation,
} from "../../../services";

const validationSchema = y.object({
    title: y.string().required(),
    authorId: y.number().required(),
    content: y.string(),
    thumbnail: y.string(),
    tags: y.array(y.string()).required(),
});

type FormCreateProp = {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export const FormCreate = (props: FormCreateProp) => {
    const { open, onClose, onCreated } = props;
    const [tags, setTags] = useInputState<string[]>([]);

    const [banner, setBanner] = useState<string>("");

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
        usePostArticleMutation();

    const {
        values,
        errors,
        submitForm,
        setFieldValue,
        touched,
    } = useFormik({
        validationSchema,
        initialValues: {
            title: "",
            authorId: 0,
            content: "",
            thumbnail: "",
            isFeatured: false,
            tags: [],
            position: 1,
        },
        onSubmit,
        enableReinitialize: true,
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
        setFieldValue("thumbnail", banner);
    }, [banner]);

    return (
        <Modal
            opened={open}
            onClose={onClose}
            size="xl"
            title="Add Article"
        >
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
                                data={tags}
                                searchable
                                creatable
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
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            <InputWrapper
                                required
                                label="Thumbnail"
                                error={
                                    touched.thumbnail &&
                                    errors.thumbnail
                                }
                            >
                                <InputImage
                                    propsOnChange={(
                                        value: any
                                    ) =>{
                                        setFieldValue(
                                            "thumbnail",
                                            value[0]
                                        )}
                                    }
                                    imgRatio={4 / 3}
                                />
                            </InputWrapper>
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
