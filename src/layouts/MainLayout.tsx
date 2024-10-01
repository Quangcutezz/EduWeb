import Header from '../components/Header';
import NavigateBar from '../components/NavigateBar';
import Footer from '../components/Footer';
import { Roles } from '../App';

type MainLayoutProps = {
   children: React.ReactNode;
   isAuthenticated: boolean;
   roles?: Roles[];
};

function MainLayout(props: MainLayoutProps) {
   return (
      <div className="overflow-hidden max-w-screen min-h-screen select-none">
         <Header />
         <div className="flex pt-header gap-2 justify-start items-start w-full overflow-hidden pb-32">
            <div className="w-full max-w-screen-2xl m-auto">{props.children}</div>
         </div>
         <NavigateBar />
         <Footer />
      </div>
   );
}

export default MainLayout;
