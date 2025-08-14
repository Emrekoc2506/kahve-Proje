/*import { useEffect, useState } from "react";
import { deleteActiveUser, getActiveUser } from "./localStoarge";
import type { IUserModel } from "./localStoarge";
import { useNavigate } from "react-router";
const Home = () => {

    const [activeUser, setActiveUser] = useState<IUserModel>();
    const navigate = useNavigate();

    useEffect(() => {
        const data = getActiveUser();
        if (data === null) {
            navigate("/login")
        }

        setActiveUser(data)
    }, []);
    const handleLogOut = () => {
        deleteActiveUser();
        navigate("/login");
    };

    return (
        <div>
            <div style={{ color: "white" }}>
                Hoşgeldin {activeUser?.username}
            </div>
            <button onClick={handleLogOut}>logout</button>
        </div>
    );
};
export default Home;*/
//bir kullanıcının oturum açıp açmadığını kontrol etmek ve oturumu kapatmak için