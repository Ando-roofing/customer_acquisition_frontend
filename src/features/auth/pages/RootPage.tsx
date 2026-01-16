import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

export default function RootPage() {

    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Still resolving session
    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center mt-5">
                <span>Loading...</span>
            </div>
        );
    }

    if (["Facilitator", "Product Brand Manager", "Zonal Sales Executive", "admin"].includes(user.position)) {
        return <Navigate to="/dashboard" replace />;
    } else if (["Corporate Officer", "Mobile Sales Officer", "Desk Sales Officer"].includes(user.position)) {
        return <Navigate to="/add_visit" replace />;
    } else {
        return <Navigate to="/index" replace />;
    }

    return (
            <div className="d-flex justify-content-center mt-5">
                <span>Loading...</span>
            </div>
    );

};
