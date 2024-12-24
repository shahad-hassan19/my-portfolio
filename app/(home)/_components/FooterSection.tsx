

export default function FooterSection(){
    return(
        <div className="border-t-2 border-white w-full mt-10 py-16">
            <div className="sm:mx-12 md:mx-6 lg:mx-8 xl:mx-24 text-white text-center font-normal grid grid-cols-1 lg:grid-cols-2 align-items-center ">
                <div className="px-3 mb-2 lg:mb-0">
                    <p className=" text-center ">Copyright &copy; 2023 <span className=" text-yellow-300 underline">Shahad</span>. All Rights Reserved.</p>
                </div>
                <div className="px-3">
                    <p>Designed by <span className=" text-yellow-300 underline">Shahad Hassan</span></p>
                </div>
            </div>
        </div>
    )
}