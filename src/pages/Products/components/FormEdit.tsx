import React, {useEffect, useState} from "react";
import {ProdSeries, relatesObj} from "../../../entities";
import {
  useGetProductCategoriesPaginationQuery,
  useGetSkinConcernsQuery,
  useGetSkinTypesQuery, useGetTypeCategoryPaginationQuery, useGetTypeSeriesPaginationQuery,
  usePutProductCategoriesMutation,
} from "../../../services";
import {ImagePicker} from "../../../components/ImagePicker/index";
import {ActionIcon, Box, Button, Grid, Input, InputWrapper, Modal, MultiSelect, Select, TextInput} from "@mantine/core";
import {useGetCategories} from "../hooks/useGetCategories";
import {RichTextEditor} from "@mantine/rte";
import {useFormik} from "formik";
import * as y from 'yup';
import '../../../assets/style.css'
import {ImageUploader} from "../../../components/ImageUploader";
import {useModal} from "../../../hooks/useModal";
import {array} from "yup";
import {Pencil, Trash} from "tabler-icons-react";
import {MultiImageControl} from "../../Article/components/MultiImageControl";

type FormEditProp = {
  data: ProdSeries;
  open: boolean;
  onClose: () => void
  onUpdated: () => void
};

export const FormEdit = (props: FormEditProp) => {
  const {data, open, onClose, onUpdated} = props;

  const {data: series} = useGetTypeSeriesPaginationQuery({page: 1, perPage: 100})
  const {data: categories} = useGetTypeCategoryPaginationQuery({page: 1, perPage: 100})
  const [onSubmit, {data: result}] = usePutProductCategoriesMutation();
  const {data: skinConcerns} = useGetSkinConcernsQuery({page: 1, perPage: 100});
  const {data: skinTypes} = useGetSkinTypesQuery({page: 1, perPage: 100});
  const {data: products} = useGetProductCategoriesPaginationQuery({page: 1, perPage: 100})

  const [bottle, setBottle] = useState('');
  const [bottleBox, setBottleBox] = useState('');

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
    // featuredImage: y.string().required(),
  });

  const {values, errors, setFieldValue, submitForm} = useFormik({
    validationSchema,
    initialValues: {
      id: data.id,
      name: data.name,
      seriesId: data.seriesId,
      categoryId: data.categoryId,
      sku: data.sku,
      description: data.description,
      usedAs: data.usedAs,
      howToUse: data.howToUse,
      keyingredient: data.keyingredient,
      isFeatured: data.isFeatured,
      // featuredImage: data.featuredImage,
      // featuredImageUrl: data.featuredImageUrl,
      skinConcernIds: data.skinConcerns.map((item) => item.id.toString()),
      skinTypeIds: data.skinTypes.map((item) => item.id.toString()),
      // ------------------ IMAGES DAN RELATED PRODUCT BELUM ADA DI ENTITIES ----------------------------------
      images: data.images.map((item) => item.imageSource.toString()),
      imagesUrl: data.images.map((item) => item.imageSourceUrl.toString()),
      // imagesUrlBottle: data.images[0]?.imageSourceUrl,
      // imagesUrlBox: data.images[1]?.imageSourceUrl || "",
      relatedProductIds: data.relates.map((item:relatesObj) => item.id.toString())
    },
    onSubmit,
    enableReinitialize: true
  });

  useEffect(() => {
    if (result) {
      onUpdated()
    }
  }, [result]);


  const [imagesList, setImagesList] = useState<any>([])
  // const [imageListUrl, setImageListUrl] = useState<any>(values.imagesUrl)

  // const handleAddImage = () => {
  //   const array = [...imageList]
  //   array.splice(imageList.length + 1, 0, "")
  //
  //   setImageList(array)
  //   setFieldValue("images", imageList)
  //
  //   console.log(imageList)
  // }

  // useEffect(() => {
  //   setImageList(values.images)
  // })
  //
  // console.log(values.images)


  // console.log("IMAGES FORMIK")
  // console.log(values.images)
  //
  // console.log("Images data")
  // console.log(data.images)

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
              label="ProdSeries Name"
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
              label="ProdSeries SKU"
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
                label="Series"
                error={errors.seriesId}
            >
              <Select
                  value={String(values.seriesId) || ""}
                  data={series?.data.map((item: any) => ({label: item.name, value: String(item.id)})) || []}
                  onChange={(e:string) => setFieldValue('seriesId', String(e))}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Category"
              error={errors.categoryId}
            >
              <Select
                value={String(values.categoryId) || ""}
                data={categories?.data.map((item: any) => ({label: item.name, value: String(item.id)})) || []}
                onChange={(e: string) => setFieldValue('categoryId', String(e))}
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
                onChange={(e: any) => setFieldValue("usedAs", e.target.value)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="ProdSeries Ingredient"
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
                label="Related Products"
                required
                error={errors.relatedProductIds}
            >
              <MultiSelect
                  value={values.relatedProductIds}
                  data={products?.data.map((item: any)=> ({label: item.name, value: item.id.toString()})) || []}
                  onChange={(value) => setFieldValue('relatedProductIds', value)}
                  maxSelectedValues={4}
              />
            </InputWrapper>
          </Grid.Col>

          {/*<Grid.Col>*/}
          {/*  <InputWrapper*/}
          {/*      required*/}
          {/*      label="Featured Image"*/}
          {/*      error={errors.featuredImage}*/}
          {/*  >*/}
          {/*    <ImageUploader*/}
          {/*        defaultImage={values.featuredImageUrl}*/}
          {/*        propsOnChange={(value:any) => setFieldValue("featuredImage", value[0])}*/}
          {/*    />*/}
          {/*  </InputWrapper>*/}
          {/*</Grid.Col>*/}

          {/*<Grid.Col>*/}
          {/*  <InputWrapper*/}
          {/*      required*/}
          {/*      label="Featured Image"*/}
          {/*      error={errors.featuredImage}*/}
          {/*  >*/}
          {/*    <ImagePicker result={values.featuredImageUrl} propsOnChange={(value: any) => {*/}
          {/*      setFieldValue('featuredImage', value[0])*/}
          {/*    }}/>*/}
          {/*  </InputWrapper>*/}
          {/*</Grid.Col>*/}


          <Grid.Col style={{display: "flex", flexDirection: "column", gap: 25}}>

          {/*{imageList.map((item: any, index: number) => {*/}
          {/*  return (*/}
          {/*      <InputWrapper*/}
          {/*          required*/}
          {/*          label="Featured Image"*/}
          {/*          error={errors.images}*/}
          {/*      >*/}
          {/*        <ActionIcon*/}
          {/*            color="red"*/}
          {/*            sx={{*/}
          {/*              background: "white"*/}
          {/*            }}*/}
          {/*            // onClick={handleOnEditRequest}*/}
          {/*        >*/}
          {/*          <Trash/>*/}
          {/*        </ActionIcon>*/}
          {/*        <ImageUploader*/}
          {/*            defaultImage={values.imagesUrl[index] ? values.imagesUrl[index]: null}*/}
          {/*            propsOnChange={(value:any) => {*/}
          {/*              let imgTemp: any;*/}
          {/*              imgTemp = imageList;*/}
          {/*              imgTemp[index] = value[0]*/}

          {/*              setImageList(imgTemp)*/}

          {/*              console.log(imageList)*/}

          {/*              setFieldValue('images', imageList)*/}
          {/*            }*/}
          {/*            }*/}
          {/*        />*/}
          {/*      </InputWrapper>*/}
          {/*  )*/}
          {/*})}*/}
          {/*  <Button onClick={handleAddImage}>Add Image</Button>*/}

            {/*<MultiImageControl*/}
            {/*    errorMessage={errors.images}*/}
            {/*    defaultImage={values.images}*/}
            {/*    defaultImageUrl={values.imagesUrl}*/}
            {/*    propsOnChange={(value: any) => {*/}
            {/*      setFieldValue("images", value, true)*/}
            {/*    }}*/}
            {/*/>*/}

          </Grid.Col>

          <Grid.Col>
            <InputWrapper
                required
                label="Featured Image"
                error={errors.images}
            >
              <ImageUploader
                  defaultImage={values.imagesUrl[0]}
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
                required
                label="Featured Image"
                error={errors.images}
            >
              <ImageUploader
                  defaultImage={values.imagesUrl[1]}
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
