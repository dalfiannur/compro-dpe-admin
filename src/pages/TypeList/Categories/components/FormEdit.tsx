import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Input, InputWrapper, Modal, MultiSelect, Select, TextInput} from "@mantine/core";
import {useFormik} from "formik";
import * as y from 'yup';
import '../../../../assets/style.css'
import {ImagePicker} from "../../../../components/ImagePicker";
import {usePutTypeCategoryMutation} from "../../../../services";

type FormEditProp = {
  data: any;
  open: boolean;
  onClose: () => void
  onUpdated: () => void
};

export const FormEdit = (props: FormEditProp) => {
  const {data, open, onClose, onUpdated} = props;

  const [onSubmit, {data: result}] = usePutTypeCategoryMutation();

  const [icon, setIcon] = useState('');

  const validationSchema = y.object({
    name: y.string().required(),
    slug: y.string().required(),
  });

  const {values, errors, setFieldValue, submitForm} = useFormik({
    validationSchema,
    initialValues: {
      id: data.id,
      name: data.name,
      slug: data.slug,
      icon: data.iconUrl,
      description: "asdasd"
    },
    onSubmit,
    enableReinitialize: true
  });

  useEffect(() => {
    if (result) {
      onUpdated()
    }
  }, [result]);

  useEffect(() => {
    setFieldValue('icon', icon);
  }, [icon]);

  return (

        <Modal
            opened={open}
            onClose={onClose}
            title="Edit ProdSeries"
            size="xl"
        >
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
                    label="Icon"
                    error={errors.icon as string}
                >
                  <ImagePicker result={(val) => setIcon(val)} defaultImage={values.icon}/>
                </InputWrapper>
              </Grid.Col>
            </Grid>
          </Box>

          <Box
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'end',
                marginTop: theme.spacing.md,
                gap: theme.spacing.md
              })}
          >
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={() => submitForm()}>Save</Button>
          </Box>
        </Modal>
  );
};
