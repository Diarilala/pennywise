import SideBar from './SideBar.tsx';
import SummarySection from './SummarySection.tsx';

const Dashboard = () => {

    return (
        <>  

            <div className=' bg-amber-300 w-screen h-screen p-5 flex justify-between'>
                <SideBar />
                <SummarySection />
            </div>
        </>
    )
}

export default Dashboard;