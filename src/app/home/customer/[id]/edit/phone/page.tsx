import EditPhoneDetails from "@/components/customer/customer.editPhone";
import {Suspense} from "react";

const EditPhonePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPhoneDetails/>
        </Suspense>
    );
};
export default EditPhonePage;