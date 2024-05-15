import Modal from "../../../../Component/Modal";
import {
  faGift,
  faPencil,
  faTrash,
  faPhone,
  faDollar,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  GetDetailSalary,
  DeleteEmployeeSalary,
} from "../../../../api/EmployeeSalaryApi";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import Badge from "../../../../Component/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faEgg } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import Button from "../../../../Component/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";

export default function ModalDetailSalary({ open, setOpen, id }) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const cancelButtonRef = useRef(null);
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const handleLoadEdit = (id) => {
    setLoad(true);
    setItemId(id);
  };

  const deleteEmployeeSalary = useMutation({
    mutationFn: async (id) => {
      await DeleteEmployeeSalary(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["salaries"]);
    },
  });

  const swalDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete this ?  `,
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
            deleteEmployeeSalary.mutateAsync(data.id),
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
            },
          );
        }
      });
  };
  useEffect(() => {
    setLoad(true);
    console.log(id);
    if (open) {
      const salaryDetail = async () => {
        const data = await GetDetailSalary(id);
        setData(data);
        setTimeout(() => {
          setLoad(false);
        }, 100);
      };
      salaryDetail();
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
      {load ? (
        <div className="mx-auto">
          <BeatLoader color="orange" loading={load} size={12} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="w-full bg-orange-500 p-4">
            <h1 className="text-3xl font-semibold text-white">
              <FontAwesomeIcon icon={faDollar} className=" me-2" />
              Detail Salary
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-6 px-6">
            <div className="col-span-5">
              <div className="w-screen">
                <h1 className="mb-2 text-3xl font-semibold text-black">
                  {data.employee.users.fullName.length < 30
                    ? data.employee.users.fullName
                    : `${data.employee.users.fullName.substring(0, 30)}...`}
                </h1>
                <div className="flex justify-start gap-x-2">
                  <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                    <p className=" text-lg text-white">
                      Role : {data.employee.users.roles.role_name}
                    </p>
                  </Badge>
                  <Badge bgColor="bg-green-500" ringColor="ring-transparent">
                    <p className=" text-lg text-white">
                      Absences : {data.employee.absence.length}
                    </p>
                  </Badge>
                </div>
                <div className="pt-4">
                  <NavLink to={`addEmployeeSalary/${data.employee.id}`}>
                    <Button className="border-orange-500 bg-transparent px-2 text-sm text-orange-500 hover:text-white">
                      <FontAwesomeIcon icon={faSquarePlus} className="me-1" />{" "}
                      Add Employee Salary
                    </Button>
                  </NavLink>
                </div>
              </div>
              <div className="my-6 rounded-xl border-2 pb-4 ">
                <table className=" w-full text-black">
                  <thead>
                    <tr>
                      <th className="py-4 ps-4">Date</th>
                      <th className="pe-2 text-center">Daily Salary</th>
                      <th className="pe-2 text-center">Bonus</th>
                      <th className="pe-2 text-center">Total</th>
                      <th className="pe-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.salary.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-2 ps-2 ">
                            <FontAwesomeIcon
                              icon={faEgg}
                              className="me-2 text-orange-500"
                            />
                            {item.pay_date}
                          </td>
                          <td className="text-center">
                            {item.daily_salary <= 999
                              ? item.daily_salary
                              : (item.daily_salary / 1000).toFixed(1) + "K"}
                          </td>
                          <td className="text-center">
                            {item.bonus <= 999
                              ? item.bonus
                              : (item.bonus / 1000).toFixed(1) + "K"}
                          </td>
                          <td className="text-center">
                            {item.total_salary <= 999
                              ? item.total_salary
                              : (item.total_salary / 1000).toFixed(1) + "K"}
                          </td>
                          <td className="ps-8">
                            <NavLink
                              to={`/OwnerDashboard/employeeSalary/${item.id}`}
                            >
                              <Button
                                className="me-2 bg-orange-500 px-4 text-[0.9rem] text-white"
                                onClick={() => handleLoadEdit(item.id)}
                              >
                                {load && itemId == item.id ? (
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
                              className="border-orange-500 bg-transparent px-2 text-sm text-orange-500 hover:text-white"
                              onClick={() => swalDelete(item)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="me-2"
                              />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
