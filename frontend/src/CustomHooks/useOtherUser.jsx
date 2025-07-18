import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setOtherUsers } from "../features/userSlice";


const useOtherUsers = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchOtherUsers = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/otherUsers`,{
                    withCredentials: true
                })
                dispatch(setOtherUsers(res?.data?.otherUsers));
                dispatch(setLoading(false));
            } catch (error) {
                console.error("Error fetching current user:", error);
                dispatch(setOtherUsers(null));
                dispatch(setLoading(false));
            }
        }
        fetchOtherUsers();
    },[dispatch,userData]);
}

export default useOtherUsers;