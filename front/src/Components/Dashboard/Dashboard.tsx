import SideBar from './SideBar.tsx';
import SummarySection from './SummarySection.tsx';

const Dashboard = () => {

    return (
        <>  

            <div className='bg-white w-screen h-screen p-5 flex justify-between'>
                <SideBar />
                <SummarySection />
            </div>
        </>
    )
}

export default Dashboard;