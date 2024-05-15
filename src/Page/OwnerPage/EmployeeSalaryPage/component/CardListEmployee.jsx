import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "../../../../Component/Button";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { loadEdit } from "../EmployeeSalaryPage";
import ModalDetailSalary from "./ModalDetailSalary";
import { motion } from "framer-motion";
import { DeleteConsignor } from "../../../../api/ConsignorApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Badge from "../../../../Component/Badge";

export default function CardListEmployee({ search, data, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 6;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const queryClient = useQueryClient();

  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (e, p) => {
    setPage(p);
  };

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="grid grid-cols-3 gap-5"
      >
        {data
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.users.fullName.toLowerCase().includes(search) ||
                  item.users.fullName.includes(search);
          })
          .slice(startIndex, endIndex)
          .map((employee) => {
            return (
              <div className="col-span-1" key={employee.id}>
                <Card
                  sx={{
                    display: "flex",
                    borderRadius: "20px",
                    paddingX: "5px",
                  }}
                >
                  <div className="my-auto flex h-2/3 justify-center rounded-full bg-orange-100">
                    <img
                      src="https://api.dicebear.com/8.x/adventurer/svg?seed=Jasper"
                      alt="avatar"
                      className="w-28"
                    />
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {employee.users.fullName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Role : {employee.users.roles.role_name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        {employee.users.phoneNumber}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {employee.absence.length >= 4 ? (
                          <Badge bgColor="bg-red-50" ringColor="ring-red-400">
                            Absences: {employee.absence.length}
                          </Badge>
                        ) : (
                          <Badge
                            bgColor="bg-green-50"
                            ringColor="ring-green-400"
                          >
                            Absences: {employee.absence.length}
                          </Badge>
                        )}
                      </Typography>
                      <Button
                        className="me-2 mt-2 bg-orange-500 px-4 text-sm text-white"
                        onClick={() => handleOpenModal(employee.id)}
                      >
                        <FontAwesomeIcon icon={faPencil} className="me-2" />
                        Detail Salary
                      </Button>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    ></Box>
                  </Box>
                </Card>
              </div>
            );
          })}
      </motion.div>
      <div className="flex w-full justify-center pt-6">
        <Pagination
          count={Math.ceil(length / productPerPage)}
          size="small"
          className="mb-4 flex justify-center"
          onChange={handleChange}
        />
      </div>
      <ModalDetailSalary id={itemId} open={openModal} setOpen={setOpenModal} />
    </>
  );
}
