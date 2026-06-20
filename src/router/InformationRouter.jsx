import { useLocation } from "react-router-dom";
import CompanyInformation from "../components/auth/CompanyInformationForm";
import UserInformationForm from "../components/auth/UserInformationForm";
import FreelancerInformationForm from "../components/auth/FreelancerInformationForm";

const InformationRouter = () => {
    const location = useLocation();

    const role = location.state?.role;

    if (!role) {
        return <UserInformationForm />;
    }

    switch (role) {
        case "business":
            return <CompanyInformation />;

        case "licensed":
            return <FreelancerInformationForm />;

        case "standard":
        default:
            return <UserInformationForm />;
    }
};

export default InformationRouter;