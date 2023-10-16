import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminPageClientSide from "./client";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return(<>
    {!user ? (<p>Sorry, you don't have access, please <a href='./signin'>sign in</a>.</p>) 
    : <AdminPageClientSide />}
    </>)
}
