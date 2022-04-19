import {
  Box,
  Grid,
  TextField,
  FormControl,
  DialogTitle, DialogContent, DialogActions, Button, Dialog,
} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import {Product} from "../../../entities/Product";
import {
  usePutProductMutation,
} from "../../../services";
import {SelectSkinConcern} from "./SelectSkinConcern";
import {SelectSkinType} from "./SelectSkinType";
import {SelectCategory} from "./SelectCategory";
import {TextEditor} from "../../../components/TextEditor";
import {ImagePicker} from "../../../components/ImagePicker/index";

type FormEditProp = {
  data: Product|null;
  open: boolean;
  onClose: () => void
  onUpdated: () => void
};

export const FormEdit = (props: FormEditProp) => {
  const {data, open, onClose, onUpdated} = props;

  if (!data) {
    return <div/>
  }

  const [onSubmit, {data: result}] = usePutProductMutation();

  const [bottle, setBottle] = useState('');
  const [bottleBox, setBottleBox] = useState('');

  const {values, touched, errors, setFieldValue, submitForm} = useFormik({
    initialValues: {
      name: data.name,
      sku: data.sku,
      keyingredient: data.keyingredient,
      categorySlug: data.category.slug,
      skinConcernIds: data.skinConcerns.map((item) => item.id),
      skinTypeIds: data.skinTypes.map((item) => item.id),
      description: data.description,
      howToUse: data.howToUse,
      usedAs: data.usedAs,
      images: ['', ''],
      isFeatured: data.isFeatured
    },
    onSubmit(values) {
      onSubmit({
        id: data.id,
        ...values
      })
    }
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            marginTop: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={values.name}
                label="Product Name"
                variant="outlined"
                sx={{width: "100%"}}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.sku}
                label="Product SKU"
                variant="outlined"
                sx={{width: "100%"}}
                error={touched.sku && !!errors.sku}
                helperText={touched.sku && errors.sku}
                onChange={(e) => setFieldValue("sku", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectCategory value={values.categorySlug} onChange={(value) => setFieldValue('categorySlug', value)}/>
            </Grid>
            <Grid item xs={12}>
              <SelectSkinConcern value={values.skinConcernIds}
                                 onChange={(value) => setFieldValue('skinConcernIds', value)}/>
            </Grid>
            <Grid item xs={12}>
              <SelectSkinType value={values.skinTypeIds} onChange={(value) => setFieldValue('skinTypeIds', value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.usedAs}
                label="Used As"
                variant="outlined"
                sx={{width: "100%"}}
                error={touched.usedAs && !!errors.usedAs}
                helperText={touched.usedAs && errors.usedAs}
                onChange={(e) => setFieldValue("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.keyingredient}
                label="Product Ingredient"
                variant="outlined"
                sx={{width: "100%"}}
                error={touched.keyingredient && !!errors.keyingredient}
                helperText={touched.keyingredient && errors.keyingredient}
                onChange={(e) => setFieldValue("keyingredient", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <label>Description</label>
                <TextEditor value={values.description} onChange={(value) => setFieldValue('description', value)}/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <label>How To Use</label>
                <TextEditor value={values.howToUse} onChange={(value) => setFieldValue('howToUse', value)}/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label>Bottle Image</label>
                <ImagePicker result={setBottle}/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label>Bottle Image with Box</label>
                <ImagePicker result={setBottleBox}/>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={submitForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
