import React, { useEffect, useContext, useState, createContext } from "react";

const RouterContext = createContext();

export const useRouterContext = () => useContext(RouterContext);

const RouterProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("");
  // const [lastRoute, setLastRoute] = useState("");
  // const [theNavigator, setTheNavigator] = useState(false);

  const [address, setAddress] = useState([
    {
      color: "inherit",
      underline: "hover",
      href: "/",
      label: "Dashboard",
    },
  ]);

  // return last word in string
  const getLastString = (stringchars) => {
    var n = stringchars.split("/");
    return n[n.length - 1];
  };

  // return capitalized string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onAddressChange = (obj) => {
    let tmpLink = (item) => item.href.toString() === obj.toString();
    if (tmpLink) {
      let pos = address.findIndex(tmpLink) + 1;
      address.length = pos;
    }
  };

  const onAddressUpdate = (obj) => {
    var n = obj.pathname.split("/");
    localStorage.removeItem("breadCrumbsAddress");
    const addr = n.filter((item) => item.length > 0);

    let tmpHref = "";
    let initVal = {
      color: "inherit",
      underline: "hover",
      href: "/",
      label: "Dashboard",
    };
    setAddress([initVal]);
    localStorage.setItem("breadCrumbsAddress", JSON.stringify([initVal]));

    addr.forEach((item, idx) => {
      tmpHref += item + "/";

      let tmpAddress = {
        color: "inherit",
        underline: "hover",
        href: tmpHref,
        label: capitalizeFirstLetter(item),
      };
      setAddress((prev) => [...prev, tmpAddress]);
      localStorage.setItem(
        "BreadCrumbsAddress",
        JSON.stringify([...address, tmpAddress])
      );
    });
  };

  return (
    <RouterContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        address,
        // InitializeAddress,
        onAddressUpdate,
        onAddressChange,
        // lastRoute,
        // setLastRoute,
        // theNavigator,
        // setTheNavigator,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
