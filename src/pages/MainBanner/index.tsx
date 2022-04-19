import { Button } from "@mui/material";
import Layout from "../../components/Layout";
import FormCreate from "./_components/FormCreate";
import TableArea from "./_components/TableArea";
import { useModal } from "../../hooks/useModal";
import { useRef, useState } from "react";
import DeleteConfirmation from "./_components/DeleteConfirmation";
import { Banner } from "../../entities";

export default () => {
  const [modal, setModal] = useModal();
  const [selectedItem, setSelectedItem] = useState<Banner>()

  const tableRef = useRef<any>(null);

  const handleDeleteRequest = (item: Banner) => {
    setSelectedItem(item)
    setModal('delete', true)
  }

  const handleOnCreated = () => {
    setModal("create", false);
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  const handleOnDeleted = () => {
    setModal("delete", false);
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  return (
    <Layout>
      <Button variant="contained" onClick={() => setModal("create", true)}>
        Add Banner
      </Button>

      <TableArea 
        ref={tableRef}
        onDelete={handleDeleteRequest}
      />

      <FormCreate
        open={modal.create}
        onClose={() => setModal("create", false)}
        onCreated={handleOnCreated}
      />
      <DeleteConfirmation item={selectedItem} open={modal.delete} onClose={() => setModal("delete", false)} onDeleted={handleOnDeleted} />
    </Layout>
  );
};
