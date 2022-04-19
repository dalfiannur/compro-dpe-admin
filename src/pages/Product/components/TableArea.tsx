import React, {ChangeEvent, forwardRef, useImperativeHandle, useState} from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useGetProductPaginationQuery} from "../../../services/product";
import {Product} from "../../../entities/Product";

type TableAreaProp = {
  onEdit: (item: Product) => void
  onDelete: (item: Product) => void
}
export const TableArea = forwardRef((props: TableAreaProp, ref: any) => {
  const {onEdit, onDelete} = props;

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const { data, refetch } = useGetProductPaginationQuery({ page: page + 1, perPage });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (input: ChangeEvent<HTMLInputElement>) => {
    setPerPage(+input.target.value);
  };

  useImperativeHandle(ref, () => ({
    refetch
  }));

  return (
    <div>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>#Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="success"
                    onClick={() => onEdit(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30]}
        count={data?.meta.total || 0}
        page={page}
        component="div"
        rowsPerPage={perPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  )
});
