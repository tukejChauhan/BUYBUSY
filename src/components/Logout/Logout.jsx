import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { actions } from "../../redux/reducers/productsReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

//function for logging out
function Logout(){
const navigate = useNavigate();
const dispatch = useDispatch();

//dispatchung action to remove user
useEffect(() => {
    dispatch(actions.removeUser());
    toast.success("Logged Out successfully");
    navigate("/");
}, []);

return;

}

export default Logout;