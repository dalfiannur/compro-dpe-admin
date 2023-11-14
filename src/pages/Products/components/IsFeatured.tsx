import {
    ActionIcon,
    Box,
    Button,
    Image,
    InputWrapper,
    MantineTheme,
    Modal,
    MultiSelect,
    Table,
    Text,
    Select,
    Grid,
} from "@mantine/core";
import {Article, ProdSeries, relatesObj} from "entities";
import { useDateTimeFormat } from "../../../hooks/useDateTimeFormat";
import React, { FC, useEffect, useState } from "react";
import { Eye, Link, Pencil, Trash } from "tabler-icons-react";
import {
    useLazyGetArticleQuery,
    usePostRelatedProductOnArticleMutation,
    useDeleteRelatedProductOnArticleMutation,
    useGetProductCategoriesPaginationQuery,
    useGetProductCategoriesFeaturedQuery, usePutProductCategoriesMutation,
} from "../../../services";
import {useFormik} from "formik";
import {useModal} from "../../../hooks/useModal";
import {FormEdit} from "./FormEdit";
import {DeleteConfirmation} from "./DeleteConfirmation";
import {Detail} from "./Detail";
import {DeleteFeaturedConfirmation} from "./DeleteFeaturedConfirmation";

interface DetailProps {
    open: boolean;
    onClose: () => void;
}

const Label = (props: any) => (
    <Text color="#5f5f5f" size="xs" weight="bold" mb={6}>
        {props.children}
    </Text>
);

export const IsFeatured = (props: DetailProps) => {
    const { open, onClose } = props;
    const [modal, setModal] = useModal();
    const [product, setProduct] = useState<any>();
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const {data: productList, refetch} = useGetProductCategoriesFeaturedQuery({
        page: 1,
        perPage: 100,
    });

    const { data: products } = useGetProductCategoriesPaginationQuery({
        page: 1,
        perPage: 1000,
    });

    const [onSubmit, {data: result}] = usePutProductCategoriesMutation();

    const {values, setFieldValue, submitForm} = useFormik({
        initialValues: {
            id: product?.id,
            name: product?.name,
            seriesId: product?.seriesId,
            categoryId: product?.categoryId,
            sku: product?.sku,
            description: product?.description,
            usedAs: product?.usedAs,
            howToUse: product?.howToUse,
            keyingredient: product?.keyingredient,
            isFeatured: 1,
            // featuredImage: product?.featuredImage,
            // featuredImageUrl: product?.featuredImageUrl,
            skinConcernIds: product?.skinConcerns.map((item: any) => item.id.toString()),
            skinTypeIds: product?.skinTypes.map((item: any) => item.id.toString()),
            images: product?.images.map((item: any) => item.imageSource.toString()),
            imagesUrl: product?.images.map((item: any) => item.imageSourceUrl.toString()),
            // imagesUrlBottle: product?.images[0]?.imageSourceUrl,
            // imagesUrlBox: product?.images[1]?.imageSourceUrl || "",
            relatedProductIds: product?.relates.map((item:relatesObj) => item.id.toString())
        },
        onSubmit,
        enableReinitialize: true
    });

    const handleDeleteButton = (item: any) => {
        setSelectedProduct(item.slug)
        // console.log(item)
        setModal("delete", true)
    };

    const handleOnDeleted = () => {
        setModal("delete", false);
        refetch();
    };

    useEffect(() => {
        if (result) {
            refetch();
        }
    }, [result]);

    // useEffect(() => {
    //     if (isSuccess || delIsSuccess) {
    //         fetcher(data.slug);
    //     }
    // }, [isSuccess, delIsSuccess]);
    //
    // console.log(products?.data)
    //

    console.log(product)
    return (
        <Modal opened={open} size="lg" onClose={onClose} title="Featured Products">
            <Box>
                <Grid>
                    <Grid.Col span={8}>
                        <InputWrapper label="Products">
                            <Select
                                value={products?.data}
                                data={
                                    products?.data.map((item: any) => ({
                                        label: item.name,
                                        value: item,
                                    })) || []
                                }
                                //@ts-ignore
                                onChange={(value) => setProduct(value)}
                            />
                        </InputWrapper>
                    </Grid.Col>
                    <Grid.Col span={4} sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Button onClick={submitForm}>Tambah</Button>
                    </Grid.Col>
                </Grid>

                <Table sx={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>#Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {productList?.data.data.map((item: any) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 5,
                                }}
                            >
                                <ActionIcon
                                    color="red"
                                    onClick={() => handleDeleteButton(item)}
                                >
                                    <Trash />
                                </ActionIcon>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {selectedProduct && (
                    <>
                        <DeleteFeaturedConfirmation
                            slug={selectedProduct}
                            open={modal.delete}
                            onClose={() => setModal("delete", false)}
                            onDeleted={handleOnDeleted}
                        />
                    </>
                )}
            </Box>
        </Modal>
    );
};

const itemSection = (theme: MantineTheme) => ({
    borderWidth: 1,
    borderColor: "#dedede",
    borderStyle: "solid",
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.md,
});
