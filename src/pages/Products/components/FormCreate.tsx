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
import {ImageUploader} from "../../../components/ImageUploader";
import {MultiImageControl} from "../../Article/components/MultiImageControl";

const validationSchema = y.object({
  name: y.string().required(),
  seriesId: y.string(),
  categoryId: y.string().required(),
  sku: y.string().required(),
  description: y.string().required(),
  usedAs: y.string().required(),
  howToUse: y.string().required(),
  keyingredient: y.string().required(),
  isFeatured: y.boolean().required(),
  skinConcernIds: y.array(y.string()).min(1),
  skinTypeIds: y.array(y.string()).required().min(1),
  relatedProductIds: y.array(y.string()).min(1),
  featuredImage: y.string().required(),
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
      seriesId: '',
      categoryId: '',
      sku: '',
      description: '',
      usedAs: '',
      howToUse: '',
      keyingredient: '',
      isFeatured: false,
      featuredImage: "images/e71d2406-6c51-4622-9b4b-8cf6ebe57022.jpg",
      skinConcernIds: [],
      skinTypeIds: [],
      images: [],
      relatedProductIds: []
    },
    onSubmit
  });

  useEffect(() => {
    if (result) {
      onCreated()
    }
  }, [result]);

  const [imagesList, setImagesList] = useState<any>([])

  // useEffect(() => {
  //   setFieldValue('images', [bottle, bottleBox])
  // }, [bottle, bottleBox]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size="xl"
      title="Add Product"
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
                error={errors.seriesId}
            >
              <Select
                  value={values.seriesId}
                  data={series?.data.map((item: any) => ({label: item.name, value: String(item.id)})) || []}
                  onChange={(e) => setFieldValue('seriesId', String(e))}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Category"
                required
                error={errors.categoryId}
            >
              <Select
                  value={(values.categoryId)}
                  data={categories?.data.map((item: any) => ({label: item.name, value: String(item.id)})) || []}
                  onChange={(e:string) => setFieldValue('categoryId', String(e))}
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

          {/*<Grid.Col>*/}
          {/*  <InputWrapper*/}
          {/*    required*/}
          {/*    label="Featured Image"*/}
          {/*    error={errors.featuredImage}*/}
          {/*  >*/}
          {/*    <ImagePicker result={""} propsOnChange={(value: any) => setFieldValue('featuredImage', value[0])}/>*/}
          {/*  </InputWrapper>*/}
          {/*</Grid.Col>*/}
          
          {/*<Grid.Col>*/}
          {/*  <InputWrapper*/}
          {/*      required*/}
          {/*      label="Featured Image"*/}
          {/*      error={errors.featuredImage}*/}
          {/*  >*/}
          {/*    <ImageUploader*/}
          {/*      propsOnChange={(value:any) => setFieldValue('featuredImage', value[0])}*/}
          {/*    />*/}
          {/*  </InputWrapper>*/}
          {/*</Grid.Col>*/}

          <Grid.Col>
            <InputWrapper
                label="Featured Image"
                error={errors.images}
            >
              <ImageUploader
                  propsOnChange={(value:any) => {
                    let imgTemp: any;
                    imgTemp = imagesList;
                    imgTemp[0] = value[0]

                    setImagesList(imgTemp)

                    // console.log(imagesList)

                    setFieldValue('images', imagesList)
                  }
                  }
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                label="Featured Image"
                error={errors.images}
            >
              <ImageUploader
                  propsOnChange={(value:any) => {
                    let imgTemp: any;
                    imgTemp = imagesList;
                    imgTemp[1] = value[0]

                    setImagesList(imgTemp)

                    // console.log(imagesList)

                    setFieldValue('images', imagesList)
                  }
                  }
              />
            </InputWrapper>



            {/*<MultiImageControl*/}
            {/*    errorMessage={errors.images}*/}
            {/*    propsOnChange={(value: any) => setFieldValue("thumbnail", value)}*/}
            {/*/>*/}
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
