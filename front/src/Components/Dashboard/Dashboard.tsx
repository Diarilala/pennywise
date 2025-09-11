import SideBar from './SideBar.tsx';

const Dashboard = () => {
    return (
        <>  
            <div className=' bg-amber-300 w-screen h-screen p-5 flex justify-between'>
                <SideBar />
            </div>
        </>
    )
}

export default Dashboard;