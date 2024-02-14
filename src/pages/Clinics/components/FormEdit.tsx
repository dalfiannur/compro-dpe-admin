import React, {useEffect} from "react";
import * as y from "yup";
import {Box, Button, Grid, Input, InputWrapper, Modal, useMantineTheme} from "@mantine/core";
import {usePutClinicMutation} from "../../../services";
import {useFormik} from "formik";
import {Clinics} from "../../../entities";


type FormCreateProp = {
    open: boolean;
    data: Clinics
    onClose: () => void;
    onUpdated: () => void;
};

const validationSchema = y.object({
    name: y.string().required(),
    address: y.string().required(),
    latitude: y.string().required(),
    longitude: y.string().required(),
    map_url: y.string().required(),
    icon: y.string()
})

export const FormEdit = (props: FormCreateProp) => {
    const { open, onClose, onUpdated, data } = props;

    const theme = useMantineTheme();

    const [onSubmit, {data: result}] = usePutClinicMutation();

    const {values, errors, setFieldValue, submitForm, touched} = useFormik({
        validationSchema,
        initialValues: {
            id: data.id,
            name: data.name,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            map_url: data.mapUrl,
            icon: data.icon
        },
        onSubmit,
        enableReinitialize: true
    })

    useEffect(() => {
        if (result) {
            onUpdated()
        }
    }, [result]);

    return (
        <Modal opened={open} onClose={onClose} size="xl" title="Edit Clinics">
            <Box sx={{marginTop: 1}}>
                <Grid>
                    <Grid.Col>
                        <InputWrapper
                            id="input-name"
                            label="Name"
                            required
                            error={touched.name && errors.name}
                        >
                            <Input
                                value={values.name}
                                onChange={(e: any) => setFieldValue("name", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            label="Address"
                            required
                            error={touched.address && errors.address}
                        >
                            <Input
                                value={values.address}
                                onChange={(e) => setFieldValue("address", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            label="Latitude"
                            required
                            error={touched.latitude && errors.latitude}
                        >
                            <Input
                                value={values.latitude}
                                onChange={(e) => setFieldValue("latitude", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            label="Longitude"
                            required
                            error={touched.longitude && errors.longitude}
                        >
                            <Input
                                value={values.longitude}
                                onChange={(e) => setFieldValue("longitude", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            label="Url Map"
                            required
                            error={touched.map_url && errors.map_url}
                        >
                            <Input
                                value={values.map_url}
                                onChange={(e) => setFieldValue("map_url", e.target.value)}
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
    )
}