import {auth} from "@/auth";
import {sendRequest} from "@/utils/api";
import CustomerDetails from "@/components/customer/customer.details";

const CustomerPage = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<IUserById>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/${session?.user?.id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: {
                tags: ['customer-details'],
            }
        }
    })
    const user = res?.data || null;
    const access_token = session?.user?.access_token || "";
    return (
        <>
            <CustomerDetails
                user={user}
                access_token={access_token}
            />
        </>
    );
};
export default CustomerPage;
