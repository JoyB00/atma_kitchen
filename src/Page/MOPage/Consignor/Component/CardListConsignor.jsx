import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "../../../../Component/Button";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faPencil,
  faTrash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { loadEdit } from "../ConsignorPage";
import ModalProductConsignor from "./ModalProductConsignor";
import { motion } from "framer-motion";
import { DeleteConsignor } from "../../../../api/ConsignorApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CardListConsignor({ search, data, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 6;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const queryClient = useQueryClient();
  const [load, setLoad] = useAtom(loadEdit);
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (e, p) => {
    setPage(p);
  };
  const handleLoadEdit = (id) => {
    setLoad(true);
    setItemId(id);
  };

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };
  const deleteConsignor = useMutation({
    mutationFn: async (id) => {
      await DeleteConsignor(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["consignors"]);
    },
  });

  const swalDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete ${data.consignor_name} ?  `,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.promise(
            deleteConsignor.mutateAsync(data.id),
            {
              loading: "Loading",
              success: "Your file has been Deleted",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "top-center",
            }
          );
        }
      });
  };
  useEffect(() => {
    setLoad(false);
  }, []);
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
              : item.consignor_name.toLowerCase().includes(search) ||
                  item.consignor_name.includes(search);
          })
          .slice(startIndex, endIndex)
          .map((consignor) => {
            return (
              <div className="col-span-1">
                <Card
                  sx={{
                    display: "flex",
                    borderRadius: "20px",
                    paddingX: "5px",
                  }}
                >
                  <div className="my-auto bg-orange-100 rounded-full flex justify-center h-2/3">
                    <img
                      src="https://api.dicebear.com/8.x/adventurer/svg?seed=Jasper"
                      alt="avatar"
                      className="w-28"
                    />
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {consignor.consignor_name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        {consignor.phone_number}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        <Button
                          withoutAnimate
                          className=" text-orange-500 text-sm bg-transparent hover:text-orange-600 px-0 py-2"
                          onClick={() => handleOpenModal(consignor.id)}
                        >
                          <p className="text-start">
                            <FontAwesomeIcon icon={faGift} />
                            {"  "} See Products
                          </p>
                        </Button>
                      </Typography>
                      <NavLink to={`/MoDashboard/consignor/${consignor.id}`}>
                        <Button
                          className="bg-orange-500 text-white me-2 px-4 text-[0.9rem]"
                          onClick={() => handleLoadEdit(consignor.id)}
                        >
                          {load && itemId == consignor.id ? (
                            <BeatLoader
                              color="white"
                              loading={load}
                              size={10}
                            />
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="me-2"
                              />
                              Edit
                            </>
                          )}
                        </Button>
                      </NavLink>
                      <Button
                        className="bg-transparent border-orange-500 text-orange-500 hover:text-white px-2 text-sm"
                        onClick={() => swalDelete(consignor)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />
                        Delete
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
      <div className="w-full flex justify-center pt-6">
        <Pagination
          count={Math.ceil(length / productPerPage)}
          size="small"
          className="flex justify-center mb-4"
          onChange={handleChange}
        />
      </div>
      <ModalProductConsignor
        id={itemId}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );
}
