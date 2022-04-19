import {Button} from "@mui/material";
import Layout from "../../components/Layout";
import React, {useRef, useState} from "react";
import {Product} from "../../entities";
import {FormEdit} from "./components/FormEdit";
import {FormCreate} from "./components/FormCreate";
import {useModal} from "../../hooks/useModal";
import {TableArea} from "./components/TableArea";
import {DeleteConfirmation} from "./components/DeleteConfirmation";

const ProductPage = () => {
  const tableRef = useRef<any>();

  const [modal, setModal] = useModal();

  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);

  const handleOnEditRequest = (item: Product) => {
    console.log(item);
    setSelectedProduct(item);
    setModal('edit', true)
  };

  const handleOnDeleteRequest = (item: Product) => {
    setSelectedProduct(item);
    setModal('delete', true)
  };

  const handleOnCreated = () => {
    setModal('create', false);
    if (tableRef.current) {
      tableRef.current.refetch()
    }
  };

  const handleOnUpdated = () => {
    setModal('edit', false);
    if (tableRef.current) {
      tableRef.current.refetch()
    }
  };

  const handleOnDeleted = () => {
    setModal('delete', false);
    if (tableRef.current) {
      tableRef.current.refetch()
    }
  };

  const handleOnFormEditClose = () => {
    setModal('edit', false);
    setSelectedProduct(null)
  };

  return (
    <Layout>
      <Button variant="contained" onClick={() => setModal("create", true)}>
        Add
      </Button>

      <TableArea
        ref={tableRef}
        onEdit={handleOnEditRequest}
        onDelete={handleOnDeleteRequest}
      />
      <FormCreate
        open={modal.create}
        onClose={() => setModal("create", false)}
        onCreated={handleOnCreated}
      />
      <FormEdit
        data={selectedProduct}
        open={modal.edit}
        onClose={handleOnFormEditClose}
        onUpdated={handleOnUpdated}
      />
      <DeleteConfirmation
        data={selectedProduct}
        open={modal.delete}
        onClose={() => setModal('delete', false)}
        onDeleted={handleOnDeleted}
      />
    </Layout>
  );
};

export default ProductPage;
