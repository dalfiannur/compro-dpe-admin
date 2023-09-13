import React, {useEffect} from 'react';
import {Box, Grid, Input, InputWrapper, Modal, useMantineTheme} from "@mantine/core";
import * as y from "yup";
import {useGetClinicsQuery, usePostClinicMutation} from "../../../services";
import {useFormik} from "formik";

type FormCreateProp = {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
};

const validationSchema = y.object({
    name: y.string().required(),
    address: y.string().required(),
    latitude: y.string().required(),
    longitude: y.string().required(),
    icon: y.string()
})

export const FormCreate = (props: FormCreateProp) => {
    const {open, onClose, onCreated} = props;

    const theme = useMantineTheme();
    const {data} = useGetClinicsQuery({
        page: 1,
        perPage: 100,
    })

    const [onSubmit, {data: result}] = usePostClinicMutation();

    const { values, errors, setFieldValue, submitForm, touched} = useFormik({
        validationSchema,
        initialValues: {
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            icon: ""
        },
        onSubmit,
        enableReinitialize: true
    });

    useEffect(() => {
        if(result) {
            onCreated()
        }
    }, [result])



    return (
        <Modal opened={open} onClose={onClose} size="xl" title="Add Clinics">
            <Box sx={{marginTop: 1}}>
                <Grid>
                    <Grid.Col>
                        <InputWrapper
                            id="input-name"
                            label="Name"
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
                            label="Address"
                            required
                            error={errors.address}
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
                            error={errors.latitude}
                        >
                            <Input
                                value={values.latitude}
                                onChange={(e) => setFieldValue("latitude", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                    <Grid.Col>
                        <InputWrapper
                            label="longitude"
                            required
                            error={errors.longitude}
                        >
                            <Input
                                value={values.longitude}
                                onChange={(e) => setFieldValue("longitude", e.target.value)}
                            />
                        </InputWrapper>
                    </Grid.Col>

                </Grid>
            </Box>
        </Modal>
    )
}