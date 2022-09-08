import { useContext } from "react";
import { UserContext } from "store/context/UserContext";

function useUserContext() {
  return useContext(UserContext);
}

export default useUserContext;
