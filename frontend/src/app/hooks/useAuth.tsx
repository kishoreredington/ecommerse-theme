import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../Pages/Auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { type UserInfoToken } from "../../type";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded: UserInfoToken = jwtDecode(token);
    console.log("CHECKING THE USER AUTH", decoded);

    const { userId, email, address, userName, phoneNumber } = decoded.UserInfo;

    return {
      userId,
      email,
      address,
      userName,
      role: "Prestigue Member",
      phoneNumber,
    };
  }

  return {
    userName: "",
    email: "",
    address: [],
    userId: "",
    role: "",
    phoneNumber: null,
  };
};
export default useAuth;
