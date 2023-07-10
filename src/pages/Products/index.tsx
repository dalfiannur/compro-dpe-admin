import React, {useRef, useState, useMemo, useEffect} from "react";
import {ProdSeries} from "../../entities";
import {FormEdit} from "./components/FormEdit";
import {FormCreate} from "./components/FormCreate";
import {useModal} from "../../hooks/useModal";
import {DeleteConfirmation} from "./components/DeleteConfirmation";
import {ActionIcon, Button, Card, Container, Table, Pagination, Select, Grid} from "@mantine/core";
import {
    useGetProductCategoriesPaginationQuery,
    useGetTypeCategoryPaginationQuery,
    useGetTypeSeriesPaginationQuery
} from "../../services";
import {Eye, Pencil, Trash} from "tabler-icons-react";
import {Detail} from "./components/Detail";
import {useGetCategories} from "./hooks/useGetCategories";

const ProductPage = () => {
    const tableRef = useRef<any>();

    const [modal, setModal] = useModal();
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);

    const [selectedProduct, setSelectedProduct] = useState<ProdSeries | null>(null);

    const {data: productList, refetch} = useGetProductCategoriesPaginationQuery({
        page: page,
        perPage,
    });

    const {data: seriesList} = useGetTypeSeriesPaginationQuery({
        page: page,
        perPage,
    });

    const {data: categoryList} = useGetTypeCategoryPaginationQuery({
        page: page,
        perPage,
    });

    const seriesObj = useMemo(() => {
        if (seriesList) {
            return seriesList.data.reduce((result:any, item:any) => {
                result[item.id] = item.name;
                return result;
            }, {});
        }
        return {}
    }, [seriesList])

    const categoryObj = useMemo(() => {
        if (categoryList) {
            return categoryList.data.reduce((result:any, item:any) => {
                result[item.id] = item.name;
                return result;
            }, {});
        }
        return {}
    }, [categoryList])

    const totalPage = useMemo(() => {
        if (productList) {
            return Math.ceil(productList.meta.total/perPage)
        }
        return 0
    }, [productList])

    const handleOnEditRequest = (item: ProdSeries) => {
        console.log(item)
        setSelectedProduct(item);
        setModal("edit", true);
    };

    const handleOnDeleteRequest = (item: ProdSeries) => {
        setSelectedProduct(item);
        setModal("delete", true);
    };

    const handleOnCreated = () => {
        setModal("create", false);
        refetch();
    };

    const handleOnUpdated = () => {
        setModal("edit", false);
        refetch();
    };

    const handleOnDeleted = () => {
        setModal("delete", false);
        refetch();
    };

    const handleOnFormEditClose = () => {
        setModal("edit", false);
        setSelectedProduct(null);
    };

    const handleOnViewRequest = (item: ProdSeries) => {
        setSelectedProduct(item);
        setModal("detail", true);
    };

    return (
        <>
            <Container size="xl">
                <Grid>
                    <Grid.Col span={2}>
                        <Button onClick={() => setModal("create", true)}>
                            Add New Product
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Select
                            data={useGetCategories()}/>
                    </Grid.Col>
                </Grid>
            </Container>

            <Container size="xl">
                <Card
                    sx={(theme) => ({
                        marginTop: theme.spacing.md,
                    })}
                >
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>#ID</th>
                            <th>Name</th>
                            <th>Series</th>
                            <th>Category</th>
                            <th>#Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {productList?.data.map((item: any, index:number) => (
                            <tr key={"prod" + index}>
                                <td>{page === 1 ? index + 1 :  ((page - 1)  * perPage) + index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{seriesObj[item.seriesId] || "-"}</td>
                                <td>{categoryObj[item.categoryId] || "-"}</td>
                                <td
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 5,
                                    }}
                                >
                                    <ActionIcon
                                        color="blue"
                                        onClick={() => handleOnEditRequest(item)}
                                    >
                                        <Pencil/>
                                    </ActionIcon>

                                    <ActionIcon
                                        color="red"
                                        onClick={() => handleOnDeleteRequest(item)}
                                    >
                                        <Trash/>
                                    </ActionIcon>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination
                        total={totalPage}
                        page={page}
                        onChange={setPage}
                    />
                </Card>
            </Container>

            <FormCreate
                open={modal.create}
                onCreated={handleOnCreated}
                onClose={() => setModal("create", false)}
            />

            {selectedProduct && (
                <>
                    <FormEdit
                        data={selectedProduct}
                        open={modal.edit}
                        onClose={() => setModal("edit", false)}
                        onUpdated={handleOnUpdated}
                    />

                    <DeleteConfirmation
                        data={selectedProduct}
                        open={modal.delete}
                        onClose={() => setModal("delete", false)}
                        onDeleted={handleOnDeleted}
                    />

                    <Detail
                        data={selectedProduct}
                        open={modal.detail}
                        onClose={() => setModal("detail", false)}
                    />
                </>
            )}
        </>
    );
};

export default ProductPage;
