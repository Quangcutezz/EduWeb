import Sidebar from './Sidebar';
import Header from './header';
type AdminLayoutProps = {
    children: React.ReactNode;
};
function AdminLayout(props: AdminLayoutProps) {
    return (
        <div className="max-w-screen flex  justify-between m-auto min-h-screen select-none">
            <Sidebar />
            <div className="min-w-[15rem] dark:bg-second-dark bg-light-primary"></div>
            <div className="w-full dark:bg-second-dark bg-light-primary">
                <Header />
                <div
                    style={{}}
                    className=" p-10 w-full relative overflow-hidden dark:bg-second-dark bg-light-primary p-4s "
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
