import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUserData } from "../features/userSlice";


const useCurrentUser = () => {
    const dispatch = useDispatch();
    // const { userData } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchCurrentUser = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/current`,{
                    withCredentials: true
                })
                dispatch(setUserData(res?.data?.user));
            } catch (error) {
                console.error("Error fetching current user:", error);
                dispatch(setUserData(null));
            }
        }
        fetchCurrentUser();
    },[dispatch]);
}

export default useCurrentUser;