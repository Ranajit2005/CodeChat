import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/userSlice";


const useCurrentUser = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/current`,{
                    withCredentials: true
                })
                dispatch(setUserData(res?.data?.user));
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
        fetchCurrentUser();
    },[userData,dispatch])
}

export default useCurrentUser;