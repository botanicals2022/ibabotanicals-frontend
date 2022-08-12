import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../helper/index";
import { useSnackContext } from "./snackAlertContext";

const TicketContext = createContext();
export const useTicketContext = () => useContext(TicketContext);

const TicketProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [ticketList, setTicketList] = useState([]);
  const [oneTicket, setOneTicket] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("ticketList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setTicketList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`ticketList`, JSON.stringify(data));
    }
  };

  const createTicket = (data) => {
    setLoading(true);
    RouterApi.createTicket(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setTicketList([...ticketList, resData.ticket]);
        setStorageData([...ticketList, resData.ticket]);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getAllTicket = () => {
    setLoading(true);
    RouterApi.getAllTicket()
      .then((res) => {
        const resData = res;

        setTicketList(resData.ticketList);
        setStorageData(resData.ticketList);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getSingleTicket = (id) => {
    setLoading(true);
    RouterApi.getSingleTicket(id)
      .then((res) => {
        const resData = res;

        setOneTicket(resData.ticket);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  // for update
  const onChange = (target) => {
    const { name, value } = target;
    setSelected((prev) => ({ ...prev, [name]: value }));
    setObjForUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateTicket = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateTicket(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(ticketList, resData.ticket);
        setTicketList([...tmpUps]);
        setStorageData([...tmpUps]);
        setObjForUpdate({});
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const removeFromList = (list, id) => {
    return list.filter((item) => {
      return item.id !== id;
    });
  };

  const deleteTicket = (id) => {
    setLoading(true);
    RouterApi.deleteTicket(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(ticketList, id);
        setTicketList([...deleted]);
        setStorageData([...deleted]);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  return (
    <TicketContext.Provider
      value={{
        oneTicket,
        ticketList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createTicket,
        getAllTicket,
        getSingleTicket,
        updateTicket,
        deleteTicket,
        onChange,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
