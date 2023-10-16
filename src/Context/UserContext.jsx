import { createContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
export const UseContext = createContext();

function UserContext({ children }) {
  const queryClient = useQueryClient();

  const getInboxMails = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true
    });
    return res.data;
  };

  const { data, isError, isLoading, status } = useQuery(
    "mails",
    getInboxMails,
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: 60000
    }
  );

  const parsingData = (value) => {
    value = value.replace(/\d/g, "");
    value = value.split("@");
    return value[0]
      .toLowerCase()
      .split(" ")
      .map((e) => {
        return e[0].toUpperCase() + e.slice(1);
      })
      .join(" ");
  };

  const formatTime = (value) => {
    let parsedDate = new Date(value);
    const currentDate = new Date();
    if (
      parsedDate.getDate() === currentDate.getDate() &&
      parsedDate.getMonth() === currentDate.getMonth() &&
      parsedDate.getFullYear() === currentDate.getFullYear()
    ) {
      // If it's today, format as 12-hour time with AM/PM
      const hours = parsedDate.getHours() % 12 || 12;
      const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
      const ampm = parsedDate.getHours() >= 12 ? "PM" : "AM";

      return (value = `${hours}:${minutes} ${ampm}`);
    } else {
      // If it's not today, show the date in a different format
      const options = { month: "short", day: "numeric" };
      return (value = parsedDate.toLocaleString(undefined, options));
    }
  };
  const formatDate = (value) => {
    let parsedDate = new Date(value);

    {
      // If it's today, format as 12-hour time with AM/PM
      const month = parsedDate.toLocaleString("default", { month: "long" });
      const date = parsedDate.getDate();
      const year = parsedDate.getFullYear();
      const hours = parsedDate.getHours() % 12 || 12;
      const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
      const ampm = parsedDate.getHours() >= 12 ? "PM" : "AM";

      return (value = `${month} ${date}, ${year}, ${hours}:${minutes}${ampm}`);
    }
  };

  //Delete the mails by ID
  const handleDelete = async (id) => {
    const mailToDelete = await axios.delete(
      `${import.meta.env.VITE_API_URL}/delete/${id}`,
      { withCredentials: true }
    );
    if (mailToDelete.status === 200) {
      toast.success("Mail deleted successfully", {
        autoClose: 600,
        position: "bottom-left"
      });
      queryClient.invalidateQueries("mails");
    }
  };

  return (
    <>
      <UseContext.Provider
        value={{
          data,
          isLoading,
          status,
          parsingData,
          isError,
          formatTime,
          handleDelete,
          formatDate
        }}
      >
        {children}
      </UseContext.Provider>
    </>
  );
}
UserContext.propTypes = {
  children: PropTypes.node.isRequired
};
export default UserContext;
