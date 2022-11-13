import React, {useEffect, useState} from "react";
import {Product} from "../../../entities/Product";
import {
  useGetSkinConcernsQuery,
  useGetSkinTypesQuery,
  usePutProductMutation,
} from "../../../services";
import {ImagePicker} from "../../../components/ImagePicker/index";
import {Box, Button, Grid, Input, InputWrapper, Modal, MultiSelect, Select, TextInput} from "@mantine/core";
import {useGetCategories} from "../hooks/useGetCategories";
import {RichTextEditor} from "@mantine/rte";
import {useFormik} from "formik";
import * as y from 'yup';
import '../../../assets/style.css'

type FormEditProp = {
  data: Product;
  open: boolean;
  onClose: () => void
  onUpdated: () => void
};

export const FormEdit = (props: FormEditProp) => {
  const {data, open, onClose, onUpdated} = props;

  const categories = useGetCategories();
  const [onSubmit, {data: result}] = usePutProductMutation();
  const {data: skinConcerns} = useGetSkinConcernsQuery({page: 1, perPage: 100});
  const {data: skinTypes} = useGetSkinTypesQuery({page: 1, perPage: 100});

  const [bottle, setBottle] = useState('');
  const [bottleBox, setBottleBox] = useState('');

  const validationSchema = y.object({
    name: y.string().required(),
    sku: y.string().required(),
    keyingredient: y.string().required(),
    categorySlug: y.string().required(),
    skinConcernIds: y.array(y.string()).min(1),
    skinTypeIds: y.array(y.string()).required().min(1),
    usedAs: y.string().required(),
    description: y.string().required(),
    howToUse: y.string().required(),
    isFeatured: y.boolean().required()
  });

  const {values, errors, setFieldValue, submitForm} = useFormik({
    validationSchema,
    initialValues: {
      id: data.id,
      name: data.name,
      sku: data.sku,
      keyingredient: data.keyingredient,
      categorySlug: data.category.slug,
      skinConcernIds: data.skinConcerns.map((item) => item.id.toString()),
      skinTypeIds: data.skinTypes.map((item) => item.id.toString()),
      description: data.description,
      howToUse: data.howToUse,
      usedAs: data.usedAs,
      images: ['', ''],
      isFeatured: data.isFeatured
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
    setFieldValue('images', [bottle, bottleBox]);
  }, [bottle, bottleBox]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Edit Product"
      size="xl"
    >
      <Box className="modal-body">
        <Grid>
          <Grid.Col>
            <InputWrapper
              label="Product Name"
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
              label="Product SKU"
              error={errors.sku}
            >
              <Input
                value={values.sku}
                onChange={(e: any) => setFieldValue("sku", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Category"
              error={errors.categorySlug}
            >
              <Select
                value={values.categorySlug}
                data={categories}
                onChange={(e: any) => setFieldValue('categorySlug', e)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Skin Concern"
              error={errors.skinConcernIds}
            >
              <MultiSelect
                value={values.skinConcernIds}
                data={skinConcerns?.data.map((item) => ({label: item.name, value: item.id.toString()})) || []}
                onChange={(value: any) => setFieldValue('skinConcernIds', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Skin Type"
              error={errors.skinTypeIds}
            >
              <MultiSelect
                value={values.skinTypeIds}
                data={skinTypes?.data.map((item) => ({label: item.name, value: item.id.toString()})) || []}
                onChange={(value: any) => setFieldValue('skinTypeIds', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Used As"
              error={errors.usedAs}
            >
              <TextInput
                value={values.usedAs}
                onChange={(e: any) => setFieldValue("name", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Product Ingredient"
              error={errors.keyingredient}
            >
              <TextInput
                value={values.keyingredient}
                onChange={(e: any) => setFieldValue("keyingredient", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Description"
              error={errors.description}
            >
              <RichTextEditor
                value={values.description}
                onChange={(value) => setFieldValue('description', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="How To Use"
              error={errors.howToUse}
            >
              <RichTextEditor
                value={values.howToUse}
                onChange={(value) => setFieldValue('howToUse', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Bottle Image"
              error={errors.images}
            >
              <ImagePicker result={setBottle}/>
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Bottle Image with Box"
              error={errors.images}
            >
              <ImagePicker result={setBottleBox}/>
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
