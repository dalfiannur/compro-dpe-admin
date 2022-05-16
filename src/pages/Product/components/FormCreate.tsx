import React, {useEffect, useState} from "react";
import {
  usePostProductMutation,
  useGetSkinConcernsQuery,
  useGetSkinTypesQuery,
} from "../../../services";
import {ImagePicker} from "../../../components/ImagePicker";
import {Modal, Box, Grid, InputWrapper, Input, Select, MultiSelect, Button} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from 'zod';
import {RichTextEditor} from "@mantine/rte";
import { useMantineTheme } from "@mantine/core";
import {useGetCategories} from "../hooks/useGetCategories";

const schema = z.object({
  name: z.string(),
  sku: z.string(),
  keyingredien: z.string(),
  categorySlug: z.string(),
  skinConcernIds: z.array(z.string()),
  skinTypeIds: z.array(z.string()),
  usedAs: z.string(),
  description: z.string(),
  howToUse: z.string(),
  isFeatured: z.boolean()
});



type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const FormCreate = (props: FormCreateProp) => {
  const {open, onClose, onCreated} = props;

  const theme = useMantineTheme();
  const categories = useGetCategories();

  const [postRequest, {data: result}] = usePostProductMutation();
  const {data: skinConcerns} = useGetSkinConcernsQuery({page: 1, perPage: 100});
  const {data: skinTypes} = useGetSkinTypesQuery({page: 1, perPage: 100});

  const [bottle, setBottle] = useState<string>('');
  const [bottleBox, setBottleBox] = useState<string>('');

  const {values, errors, onSubmit, setFieldValue} = useForm({
    schema: zodResolver(schema),
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
    }
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
              label="Category"
              required
              error={errors.categorySlug}
            >
              <Select
                value={values.categorySlug}
                data={categories}
                onChange={(e) => setFieldValue('categorySlug', (e as string))}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col>
            <InputWrapper
              label="Skin Concerns"
              required
              error={errors.skinConcernsId}
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
              label="How to use"
              error={errors.howToUse}
            >
              <RichTextEditor value={values.howToUse} onChange={(value) => setFieldValue('howToUse', value)}/>
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
          onClick={() => onSubmit(postRequest)}
          sx={{
            marginLeft: theme.spacing.md
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};
