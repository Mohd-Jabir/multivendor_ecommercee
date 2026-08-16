import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/authApi";
import {
  setCredentials,
  logout as logoutAction,
} from "../features/auth/authSlice";
const getRoleRedirectPath = (role) => {
  switch (role) {
    case "CUSTOMER":
      return "/";
    case "VENDOR":
      return "/vendor/dashboard";
    case "ADMIN":
      return "/admin";
    default:
      return "/";
  }
};
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("LOGIN RESPONSE:", data);
      dispatch(setCredentials(data));
      const redirectPath = getRoleRedirectPath(data.role);
      console.log("ROLE:", data.role);
      console.log("REDIRECT:", redirectPath);
      navigate(redirectPath, { replace: true });
    },
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      const redirectPath = getRoleRedirectPath(data.role);
      navigate(redirectPath, { replace: true });
    },
  });
  const logout = () => {
    dispatch(logoutAction());
    navigate("/login", { replace: true });
  };
  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
export default useAuth;
