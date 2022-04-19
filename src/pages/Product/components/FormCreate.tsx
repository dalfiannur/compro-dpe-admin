import {
  Box,
  Grid,
  TextField,
  FormControl,
  DialogTitle, DialogContent, DialogActions, Button, Dialog,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {usePostProductMutation} from "../../../services";
import {SelectCategory} from "./SelectCategory";
import {useFormik} from "formik";
import {SelectSkinConcern} from "./SelectSkinConcern";
import {SelectSkinType} from "./SelectSkinType";
import {TextEditor} from "../../../components/TextEditor";
import {ImagePicker} from "../../../components/ImagePicker/index";

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}
export const FormCreate = (props: FormCreateProp) => {
  const {open, onClose, onCreated} = props;
  const [onSubmit, { data: result }] = usePostProductMutation();

  const [bottle, setBottle] = useState<string>('');
  const [bottleBox, setBottleBox] = useState<string>('');

  const {values, errors, touched, submitForm, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      sku: '',
      keyingredient: '',
      categorySlug: '',
      skinConcernIds: [],
      skinTypeIds: [],
      description: '',
      howToUse: '',
      usedAs: '',
      images: ['', ''],
      isFeatured: false
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
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
                onChange={(e) => setFieldValue('name', e.target.value)}
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
                onChange={(e) => setFieldValue('sku', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectCategory value={values.categorySlug}
                              onChange={(e) => setFieldValue('categorySlug', e.target.value)}/>
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
                label="Used as"
                variant="outlined"
                sx={{width: "100%"}}
                error={touched.usedAs && !!errors.usedAs}
                helperText={touched.usedAs && errors.usedAs}
                onChange={(e) => setFieldValue('usedAs', e.target.value)}
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
                onChange={(e) => setFieldValue('keyingredient', e.target.value)}
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
              <FormControl sx={{ width: '100%' }}>
                <label>Bottle Image</label>
                <ImagePicker result={(val) => setBottle(val)} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <label>Bottle Image with Box</label>
                <ImagePicker result={(val) => setBottleBox(val)} />
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
