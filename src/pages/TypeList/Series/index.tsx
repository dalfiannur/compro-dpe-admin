import React, { useRef, useState, useMemo } from "react";
import { FormEdit } from "./components/FormEdit";
import { FormCreate } from "./components/FormCreate";
import { useModal } from "../../../hooks/useModal";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import {ActionIcon, Button, Card, Container, Table, Pagination, Image} from "@mantine/core";
import { Eye, Pencil, Trash } from "tabler-icons-react";
import { Detail } from "./components/Detail";
import {useGetTypeSeriesPaginationQuery} from "../../../services";

const TypeSeries = () => {
  const tableRef = useRef<any>();

  const [modal, setModal] = useModal();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { data: typeSeriesList, refetch } = useGetTypeSeriesPaginationQuery({
    page: page,
    perPage,
  });


  const totalPage = useMemo(() => {
    if (typeSeriesList){
      return Math.ceil(typeSeriesList.meta.total/perPage)
    }
    return 0
  }, [typeSeriesList])

  const handleOnEditRequest = (item: any) => {
    setSelectedProduct(item);
    setModal("edit", true);
  };

  const handleOnDeleteRequest = (item: any) => {
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

  const handleOnViewRequest = (item: any) => {
    setSelectedProduct(item);
    setModal("detail", true);
  };

  return (
    <>
      {console.log(typeSeriesList)}
      <Container size="md">
        <Button onClick={() => setModal("create", true)}>
          Add New Series
        </Button>
      </Container>

      <Container size="md">
        <Card
          sx={(theme) => ({
            marginTop: theme.spacing.md,
          })}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name (<b>#id</b>)</th>
                <th>Slug</th>
                <th>Icon</th>
                <th>#Action</th>
              </tr>
            </thead>

            <tbody>
              {typeSeriesList?.data.map((item: any) => (
                <tr key={item.id} >
                  <td>{typeSeriesList.data.indexOf(item) + 1}</td>
                  <td>{item.name} <b>({item.id})</b></td>
                  <td>{item.slug}</td>
                  <td>
                    <Image
                        radius="md"
                        src={item.iconUrl}
                        alt={item.slug}
                        width={50}
                    />
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      height: 50,
                    }}
                  >
                    <ActionIcon
                      color="blue"
                      onClick={() => handleOnViewRequest(item)}
                    >
                      <Eye />
                    </ActionIcon>

                    <ActionIcon
                      color="blue"
                      onClick={() => handleOnEditRequest(item)}
                    >
                      <Pencil />
                    </ActionIcon>

                    <ActionIcon
                      color="red"
                      onClick={() => handleOnDeleteRequest(item)}
                    >
                      <Trash />
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

export default TypeSeries;
