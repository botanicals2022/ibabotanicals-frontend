import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../helper/index";
import { useSnackContext } from "./snackAlertContext";

const ContactContext = createContext();
export const useContactContext = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [contactList, setContactList] = useState([]);
  const [oneContact, setOneContact] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("contactList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setContactList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`contactList`, JSON.stringify(data));
    }
  };

  const createContact = (data) => {
    setLoading(true);
    RouterApi.createContact(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");
        // console.log("resData", resData);

        setContactList([...contactList, resData.contact]);
        setStorageData([...contactList, resData.contact]);
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

  const getAllContact = () => {
    setLoading(true);
    RouterApi.getAllContact()
      .then((res) => {
        const resData = res;

        setContactList(resData.contacts);
        setStorageData(resData.contacts);
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

  const getSingleContact = (id) => {
    setLoading(true);
    RouterApi.getSingleContact(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneContact(resData);
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
    // console.log(target);
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

  const updateContact = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateContact(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(contactList, resData.contact);
        setContactList([...tmpUps]);
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

  const deleteContact = (id) => {
    setLoading(true);
    RouterApi.deleteContact(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(contactList, id);
        setContactList([...deleted]);
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
    <ContactContext.Provider
      value={{
        oneContact,
        contactList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createContact,
        getAllContact,
        getSingleContact,
        updateContact,
        deleteContact,
        onChange,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
