import React, {useEffect, useState} from "react";
import {
  usePostProductCategoriesMutation,
  useGetSkinConcernsQuery,
  useGetSkinTypesQuery,
  useGetProductCategoriesPaginationQuery,
  useGetTypeSeriesPaginationQuery,
  useGetTypeCategoryPaginationQuery,
} from "../../../services";
import {ImagePicker} from "../../../components/ImagePicker";
import {Modal, Box, Grid, InputWrapper, Input, Select, MultiSelect, Button} from "@mantine/core";
import {useFormik} from "formik";
import * as y from 'yup';
import {RichTextEditor} from "@mantine/rte";
import { useMantineTheme} from "@mantine/core";
import {useGetCategories} from "../hooks/useGetCategories";

const validationSchema = y.object({
  name: y.string().required(),
  seriesSlug: y.string().required(),
  categorySlug: y.string().required(),
  sku: y.string().required(),
  description: y.string().required(),
  usedAs: y.string().required(),
  howToUse: y.string().required(),
  keyingredient: y.string().required(),
  isFeatured: y.boolean().required(),
  skinConcernIds: y.array(y.string()).min(1),
  skinTypeIds: y.array(y.string()).required().min(1),
  relatedProductIds: y.array(y.string()).min(1),
});


type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const FormCreate = (props: FormCreateProp) => {
  const {open, onClose, onCreated} = props;

  const theme = useMantineTheme();

  const {data: series} = useGetTypeSeriesPaginationQuery({page: 1, perPage: 100})
  const {data: categories} = useGetTypeCategoryPaginationQuery({page: 1, perPage: 100})

  // const series = useGetCategories();
  // const categories = useGetCategories();

  const [onSubmit, {data: result}] = usePostProductCategoriesMutation();
  const {data: skinConcerns} = useGetSkinConcernsQuery({page: 1, perPage: 100});
  const {data: skinTypes} = useGetSkinTypesQuery({page: 1, perPage: 100});
  const {data: products} = useGetProductCategoriesPaginationQuery({page: 1, perPage: 100})

  const [bottle, setBottle] = useState<string>('');
  const [bottleBox, setBottleBox] = useState<string>('');

  const {values, errors, submitForm, setFieldValue} = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      seriesSlug: '',
      categorySlug: '',
      sku: '',
      description: '',
      usedAs: '',
      howToUse: '',
      keyingredient: '',
      isFeatured: false,
      skinConcernIds: [],
      skinTypeIds: [],
      images: ['', ''],
      relatedProductIds: []
    },
    onSubmit
  });

  useEffect(() => {
    if (result) {
      onCreated()
    }
  }, [result]);

  useEffect(() => {
    setFieldValue('images', [bottle, bottleBox])
  }, [bottle, bottleBox]);

  // @ts-ignore
  // @ts-ignore
  return (
    <Modal
      opened={open}
      onClose={onClose}
      size="xl"
      title="Add ProdSeries"
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
              label="Product Name"
              required
              error={errors.name}
            >
              <Input
                value={values.name}
                onChange={(e: any) => setFieldValue('name', e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Series"
                required
                error={errors.seriesSlug}
            >
              <Select
                  value={values.seriesSlug}
                  data={series?.data.map((item: any) => ({label: item.name, value: item.id})) || []}
                  onChange={(e) => setFieldValue('seriesSlug', (e as string))}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Category"
                required
                error={errors.categorySlug}
            >
              <Select
                  value={values.categorySlug}
                  data={categories?.data.map((item: any) => ({label: item.name, value: item.id})) || []}
                  onChange={(e) => setFieldValue('categorySlug', (e as string))}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Product SKU"
              required
              error={errors.sku}
            >
              <Input
                value={values.sku}
                onChange={(e: any) => setFieldValue('sku', e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                required
                label="Description"
                error={errors.description}
            >
              <RichTextEditor value={values.description} onChange={(value) => setFieldValue('description', value)}/>
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                required
                label="Used as"
                error={errors.usedAs}
            >
              <Input
                  value={values.usedAs}
                  onChange={(e: any) => setFieldValue('usedAs', e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                required
                label="How to use"
                error={errors.howToUse}
            >
              <RichTextEditor value={values.howToUse} onChange={(value) => setFieldValue('howToUse', value)}/>
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Product Ingredient"
              required
              error={errors.keyingredient}
            >
              <Input
                value={values.keyingredient}
                onChange={(e: any) => setFieldValue('keyingredient', e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Skin Concerns"
                required
                error={errors.skinConcernIds}
            >
              <MultiSelect
                  value={values.skinConcernIds}
                  data={skinConcerns?.data.map<any>((item) => ({label: item.name, value: item.id})) || []}
                  //@ts-ignore
                  onChange={(value) => setFieldValue('skinConcernIds', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Skin Type"
                required
                error={errors.skinTypeIds}
            >
              <MultiSelect
                  value={values.skinTypeIds}
                  data={skinTypes?.data.map<any>((item) => ({label: item.name, value: item.id})) || []}
                  //@ts-ignore
                  onChange={(value) => setFieldValue('skinTypeIds', value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Related Products"
                required
                error={errors.relatedProductIds}
            >
              <MultiSelect
                  value={values.relatedProductIds}
                  data={products?.data.map((item: any)=> ({label: item.name, value: item.id})) || []}
                  //@ts-ignore
                  onChange={(value) => setFieldValue('relatedProductIds', value)}
                  maxSelectedValues={4}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Bottle Image"
              error={errors.images}
            >
              <ImagePicker result={(val) => setBottle(val)}/>
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              required
              label="Bottle Image with Box"
              error={errors.images}
            >
              <ImagePicker result={(val) => setBottleBox(val)}/>
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: theme.spacing.md
        }}
      >
        <Button
          onClick={onClose}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          onClick={submitForm}
          sx={{
            marginLeft: theme.spacing.md
          }}
        >
          Saves
        </Button>
      </Box>
    </Modal>
  );
};
