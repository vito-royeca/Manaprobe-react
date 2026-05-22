import { Outlet } from "react-router"

const FeatureLayout = () => {
    return ( 
        <section>
            <div className="flex p-20 m-auto justify-center items-center">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}
 
export default FeatureLayout;