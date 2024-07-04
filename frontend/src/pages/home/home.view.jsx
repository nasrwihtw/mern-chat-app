import Sidebar from "../../components/Sidbar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
    return (
        <div className="flex dm:h-[450px] md:h-[550px] rounded-lg overflow-hiddenbg-gray-400 bg-clip-padding 
        backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar/>
            <MessageContainer />
         
        </div>
      );
}
 
export default Home;