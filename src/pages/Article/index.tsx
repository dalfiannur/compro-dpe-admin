import React, { useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Pagination,
  Table,
} from "@mantine/core";
import { useGetArticlesQuery } from "../../services/article";
import { Eye, Pencil, Trash, Link } from "tabler-icons-react";
import { Article } from "../../entities";
import { useModal } from "../../hooks/useModal";
import { Detail } from "./components/Detail";
import { FormCreate } from "./components/FormCreate";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { FormEdit } from "./components/FormEdit";
import { Related } from "./components/Related";

const ArticlePage = () => {
  const [selectedItem, setSelectedItem] = useState<Article>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [modal, setModal] = useModal();

  const { data, refetch } = useGetArticlesQuery({ page, perPage });

  const handleOnViewRequest = (item: Article) => {
    setSelectedItem(item);
    setModal("detail", true);
  };

  const handleOnCreated = () => {
    setModal("create", false);
    refetch();
  };

  const handleOnDeleteRequest = (item: Article) => {
    setSelectedItem(item);
    setModal("delete", true);
  };

  const handleOnDeleted = () => {
    setModal("delete", false);
    refetch();
  };

  const handleOnEditRequest = (item: Article) => {
    setSelectedItem(item);
    setModal("edit", true);
  };

  const handleOnUpdated = () => {
    setModal("edit", false);
    refetch();
  };

  const handleButtonLink = (item: Article) => {
    setSelectedItem(item);
    setModal("related", true);
  };

  return (
    <>
      <Container size="xl">
        <Button onClick={() => setModal("create", true)}>
          Add New Article
        </Button>

        <Card
          sx={(theme) => ({
            marginTop: theme.spacing.lg,
          })}
        >
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Create Date</th>
                <th>#Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item, index) => (
                <tr key={index}>
                  <td>{data.data.indexOf(item) + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.createdAt}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <ActionIcon
                      color="blue"
                      onClick={() => handleButtonLink(item)}
                    >
                      <Link />
                    </ActionIcon>

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

          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "end",
              marginTop: theme.spacing.lg,
            })}
          >
            <Pagination
              total={Math.ceil(
                (data?.meta.total || 0) / (data?.meta.per_page || perPage)
              )}
              page={page}
              onChange={setPage}
            />
          </Box>
        </Card>
      </Container>

      <FormCreate
        open={modal.create}
        onClose={() => setModal("create", false)}
        onCreated={handleOnCreated}
      />

      {selectedItem && (
        <>
          <FormEdit
            data={selectedItem}
            open={modal.edit}
            onClose={() => setModal("edit", false)}
            onUpdated={handleOnUpdated}
          />

          <Detail
            open={modal.detail}
            onClose={() => setModal("detail", false)}
            data={selectedItem}
          />

          <Related
            open={modal.related}
            onClose={() => setModal("related", false)}
            data={selectedItem}
          />

          <DeleteConfirmation
            open={modal.delete}
            onClose={() => setModal("delete", false)}
            data={selectedItem}
            onDeleted={handleOnDeleted}
          />
        </>
      )}
    </>
  );
};

export default ArticlePage;
