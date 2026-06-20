import { useDispatch } from "react-redux";
import { forceRole } from "../../features/auth/authDevSlice";

const DevRoleSwitcher = () => {
    const dispatch = useDispatch();

    return (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => dispatch(forceRole("PLATFORM_ADMIN"))}>
                    PLATFORM_ADMIN
                </button>

                <button onClick={() => dispatch(forceRole("LICENSE_USER"))}>
                    LICENSE
                </button>

                <button onClick={() => dispatch(forceRole("PRIVATE_USER"))}>
                    STUDENT
                </button>

                <button onClick={() => dispatch(forceRole("COMPANY_ADMIN"))}>
                    COMPANY
                </button>
            </div>
        </div>
    );
};

export default DevRoleSwitcher;