import React, {useEffect} from "react";
import {ProdSeries, relatesObj} from "../../../entities/ProdSeries";
import {useGetProductCategoriesQuery, usePutProductCategoriesMutation} from "../../../services";
import {Box, Button, Modal, Text} from "@mantine/core";
import {useFormik} from "formik";

type DeleteConfirmationProp = {
  slug: string,
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteFeaturedConfirmation = (props: DeleteConfirmationProp) => {
  const {open, slug, onClose, onDeleted} = props;

  const {data : product} = useGetProductCategoriesQuery(slug)
  const [onSubmit, {isSuccess}] = usePutProductCategoriesMutation();

  console.log(product)

  const {values, setFieldValue, submitForm} = useFormik({
    initialValues: {
      id: product?.data.id,
      name: product?.data.name,
      seriesId: product?.data.seriesId,
      categoryId: product?.data.categoryId,
      sku: product?.data.sku,
      description: product?.data.description,
      usedAs: product?.data.usedAs,
      howToUse: product?.data.howToUse,
      keyingredient: product?.data.keyingredient,
      isFeatured: 0,
      // featuredImage: product?.data.featuredImage,
      // featuredImageUrl: product?.data.featuredImageUrl,
      skinConcernIds: product?.data.skinConcerns.map((item: any) => item.id.toString()),
      skinTypeIds: product?.data.skinTypes.map((item: any) => item.id.toString()),
      // ------------------ IMAGES DAN RELATED PRODUCT BELUM ADA DI ENTITIES ----------------------------------
      images: product?.data.images.map((item: any) => item.imageSource.toString()),
      imagesUrl: product?.data.images.map((item: any) => item.imageSourceUrl.toString()),
      // imagesUrlBottle: product?.data.images[0]?.imageSourceUrl,
      // imagesUrlBox: product?.data.images[1]?.imageSourceUrl || "",
      relatedProductIds: product?.data.relates.map((item:relatesObj) => item.id.toString())
    },
    onSubmit,
    enableReinitialize: true
  });


  useEffect(() => {
    if (isSuccess) {
      onDeleted()
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Delete Product"
    >
      <Box>
        <Text>
          Are you sure want to delete this product?
        </Text>
      </Box>

      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'end',
          gap: theme.spacing.md,
          marginTop: theme.spacing.md
        })}
      >
        <Button onClick={onClose}>No</Button>
        <Button
          color="red"
          variant="outline"
          onClick={submitForm}
        >
          Yes
        </Button>
      </Box>
    </Modal>
  )
};
